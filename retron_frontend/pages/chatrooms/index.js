import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Collapse } from "reactstrap";
import { getRooms, getHostRooms, isAuth } from "../../actions/auth";
import Layout from "../../components/Layout";
import SelectUser from "../selectUser";
import singleChat from "./[_id]";
import AOS from "aos";

const ChatUi = () => {
  // const [isOpen, setIsOpen] = useState(false);
  // const toggle = () => setIsOpen(!isOpen);
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);
  const [rooms, setRooms] = useState([]);
  const [hostRooms, setHostRooms] = useState([]);

  useEffect(() => {
    loadRooms();
    loadHostRooms();
  }, []);

  const loadRooms = () => {
    getRooms(isAuth()._id).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        console.log(data);
        setRooms(data);
      }
    });
  };
  const loadHostRooms = () => {
    getHostRooms(isAuth()._id).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        console.log(data);
        setHostRooms(data);
      }
    });
  };
  const showAdded = () => {
    return (
      <>
        <div className="list-group">
          {rooms.map((room, i) => {
            return (
              <a
                class="list-group-item list-group-item-action mb-2"
                style={{ cursor: "pointer", background: "rgba(255, 255, 255, .9)" }}
              >
                <Link href={`/chatrooms/${room._id}`}>
                  <h5>{room.roomName}</h5>
                </Link>
              </a>
              // <div key={i} className=" row">
              //     <div className="col-10">
              //         <Link href={`/chatrooms/${room._id}`}>
              //         <a><h3>{room.roomName}</h3></a>
              //         </Link>
              //     </div>
              // </div>
            );
          })}
        </div>
      </>
    );
  };
  const showHost = () => {
    return (
      <>
        <div className="list-group">
          {hostRooms.map((room, i) => {
            return (
              <a
                class="list-group-item list-group-item-action mb-2"
                style={{ cursor: "pointer", background: "rgba(255, 255, 255, .9)" }}
              >
                <Link href={`/chatrooms/${room._id}`}>
                  <h5>{room.roomName}</h5>
                </Link>
              </a>
              // <div key={i} className=" row">
              //     <div className="col-10">
              //         <Link href={`/chatrooms/${room._id}`}>
              //         <a><h3>{room.roomName}</h3></a>
              //         </Link>
              //     </div>
              // </div>
            );
          })}
        </div>
        {/*hostRooms.map((room, i) => {
            return (
                <div key={i} className=" row">
                    <div className="col-10">
                        <Link href={`/chatrooms/${room._id}`}>
                        <a><h3>{room.roomName}</h3></a>
                        </Link>
                    </div>
                </div>
            );
        })*/}
      </>
    );
  };
  return (
    <Layout>
      
      <div className="container-fluid h-100 bg-white">
        <div className="row">
          <div
            className="col-md-4"
            style={{ borderRight: "6px solid skyblue", height: "100vh",  backgroundColor: "#00acac", paddingTop: "1rem"}}
            data-aos="fade-right"
            data-aos-duration="2000"
          >
            <h3 className="text-dark text-center mb-4" style={{fontFamily: "Roboto, sans-serif"}}><b>Chat Rooms</b></h3>
            {showAdded()}
            {showHost()}
          </div>
          <div className="col-md-8" data-aos="fade-up" data-aos-duration="1500">
            <div className="d-flex justify-content-center align-item-center">
             
                <h3>Create Room</h3>
            
            </div>
          
              <div className="container">
                <SelectUser />
              </div>
      
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ChatUi;
