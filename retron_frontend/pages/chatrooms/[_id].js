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
          <div className="col-12 bg-light m-1 mr-0 rounded p-3">
            <h6>{m.messageSender}</h6>
            <h5>{m.mess}</h5>
            {(m.botResult !== '') ? (
              <div className="rounded" style={{
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
          <textarea
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
        // display: "flex",
        // justifyContent: "space-between",
        backgroundColor: "#0a3341"
      }}>
        <div className="row" style={{ position: "relative" }}>
          <div
            className="col-sm-2 sticky-top"
            style={{ borderRight: "6px solid skyblue", height: "90vh", top: "55px", backgroundImage: 'linear-gradient(#00acac, #0a3341 )' }}
          >
            <div style={{ zIndex: 10 }} style={{display: "flex",  flexDirection: "column", alignItems: "space-between"}}>
              <div className="pt-3">
              <h3 className="text-white rounded p-3"> {room.roomName}</h3>
              </div>
              <div className="" style={{position: "absolute", bottom: 0}}>
                <form className =""
                  onSubmit={(e) => sendMessage(e, { id: room._id })}
                >
                  {messagesInput()}
                  <button className="btn btn-primary">Send</button>
                </form>
              </div>
            </div>
          </div>
          <div className="col-sm-10">
            {/* <h3 className="sticky-top p-3"  style={{  top: '60px'}}>Chat Screen</h3> */}
            <div className="row">
              <div className="col-sm-10">
                {displayMess()}
              </div>
              <div className="col-sm-2 pt-5 container">
              <div className="text-white pt-5 text-center sticky-top">
                <h6 className="pt-5 text-center">Room Host: {room.userHost.name}</h6>
                <h6>Users:</h6>
                {showAddedMem()}
              </div>
              </div>
            </div>
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
