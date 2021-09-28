import { Html, Head } from "next/document";
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { getRooms, getHostRooms } from "../../actions/auth";
import Layout from "../../components/Layout";
import { singleChatRoom, isAuth } from "../../actions/auth";
import { Collapse } from "reactstrap";
import axios from "axios";
import io from "socket.io-client";

// import Router from 'next/router'
const SERVER = "ws://localhost:8900";

const singleChat = ({ room, query }) => {
  console.log("OBUIDNPBPB", room.userHost);
  const [getMessage, setGetMessages] = useState("");
  const [messa, setMess] = useState([]);
  const [members, setMembers] = useState([]);
  const socket = useRef();
  useEffect(() => {
    setMembers(room.userAdded);
    setMess(room.message);
  }, []);
  useEffect(() => {
    socket.current = io(SERVER);
    socket.current.on("get_message", (data) => {
      console.log("frm scoke", data.message);
      setMess(data.message);
    });
  }, []);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  console.log(isAuth());
  const [error, setError] = useState("");

  const showAddedMem = () => {
    return members.map((memb, i) => {
      return (
        <div key={i} className=" row">
          <div className="col-12">
            <a>
              <h6>{memb.name}</h6>
            </a>
          </div>
        </div>
      );
    });
  };

  const displayMess = () => {
    return messa.map((m, i) => {
      return (
        <div key={i} className="row">
          <div className="col-10 bg-light m-1 mr-0">
            <h6>{m.messageSender}</h6>
            <h5>{m.mess}</h5>
            {(m.botResult !== '') ? (
              <div style={{
                background: "rgba(0,0,0,.2)",
                padding: "1rem"
              }}>{m.botResult}</div>) : ''
            }
          </div>
        </div>
      );
    });
  };

  const sendMessage = (event, { id }) => {
    if (getMessage == "") {
      setError("Message Required");
    } else {
      event.preventDefault();
      let name = isAuth().name;
      const message = {
        messageSender: name,
        mess: getMessage,
      };
      socket.current.emit("new_message", { message, roomId: id });
      setGetMessages('')
      // axios.put(`http://localhost:8000/api/sendmessages/${id}`,{message})
      // .then(response => {
      //     console.log(response)
      //     window.location.reload();

      // })
      // .catch(err => console.log(err));
    }
  };

  const messagesInput = () => {
    return (
      <form>
        <div className="form-group pt-3 pb-3">
          <input
            type="text"
            onChange={(e) => setGetMessages(e.target.value)}
            value={getMessage}
            className="form-control"
            placeholder="message"
          />
        </div>
        <div className="text-danger">
          {error ? <div className="pb-3">{error}</div> : null}
        </div>
      </form>
    );
  };

  return (
    <Layout>
      <div className="container-fluid" style={{
        display: "flex",
        justifyContent: "space-between"
      }}>
        <div className="row" style={{ position: "relative" }}>
          <div
            className="col-sm-3 sticky-top"
            style={{ borderRight: "6px solid skyblue", height: "90vh", top: "55px", background: '#00acac' }}
          >
            <div style={{ zIndex: 10 }} style={{display: "flex",  flexDirection: "column", alignItems: "space-between"}}>
              <h3 className="d-flex justify-content-center"> {room.roomName}</h3>
              <div className="d-flex justify-content-center">
                <a onClick={toggle} style={{ cursor: "pointer" }}>
                  <u>Room Details</u>
                </a>
              </div>
              <div className="row">
              <Collapse isOpen={isOpen}>
                <h6>Room Host: {room.userHost.name}</h6>
                <h6>Users:</h6>
                {showAddedMem()}
              </Collapse>
              </div>
              <div className="row" style={{position: "absolute", bottom: 0}}>
                <form className =""
                  onSubmit={(e) => sendMessage(e, { id: room._id })}
                >
                  {messagesInput()}
                  <button className="btn btn-primary">Send</button>
                </form>
              </div>
            </div>
          </div>
          <div className="col-sm-9">
            {/* <h3 className="sticky-top p-3"  style={{  top: '60px'}}>Chat Screen</h3> */}
            {displayMess()}
          </div>
        </div>
        
      </div>
    </Layout>
  );
};
singleChat.getInitialProps = ({ query }) => {
  return singleChatRoom(query._id).then((res) => {
    // console.log(res.userHost)
    if (res.error) {
      console.log(res.error);
    } else {
      return { room: res, query };
    }
  });
};
export default singleChat;
