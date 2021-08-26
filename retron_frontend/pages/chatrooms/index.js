import React, {useEffect, useState} from 'react'
import Link from 'next/link';
import { getRooms, getHostRooms, isAuth } from '../../actions/auth'
import Layout from '../../components/Layout'

const ChatUi = () => {
    console.log(isAuth())
    const [rooms, setRooms] = useState([]);
    const [hostRooms, setHostRooms] = useState([]);

    useEffect(() => {
        loadRooms();
        loadHostRooms()
    }, []);
    
    const loadRooms = () => {
    getRooms(isAuth()._id).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                console.log(data)
                setRooms(data);
            }
        });
    };
    const loadHostRooms = () => {
        getHostRooms(isAuth()._id).then(data => {
                if (data.error) {
                    console.log(data.error);
                } else {
                    console.log(data)
                    setHostRooms(data);
                }
            });
        };
    const showAdded = () => {
        return rooms.map((room, i) => {
            return (
                <div key={i} className=" row">
                    <div className="col-10">
                        <Link href={`/chatrooms/${room._id}`}>
                        <a><h3>{room.roomName}</h3></a>
                        </Link>
                    </div>
                </div>
            );
        });
    };
    const showHost = () => {
        return hostRooms.map((room, i) => {
            return (
                <div key={i} className=" row">
                    <div className="col-10">
                        <Link href={`/chatrooms/${room._id}`}>
                        <a><h3>{room.roomName}</h3></a>
                        </Link>
                    </div>
                </div>
            );
        });
    };
    return(
        <Layout>
            <div className="container-fluid h-100">
                <div className="row">
                    <div className="col-md-4 bg-light">
                        <h1>Chat Ui</h1>
                        <Link href="/selectUser">
                            <a>Select Users for New Chat Room</a>
                        </Link>
                        {showAdded()}
                        {showHost()}
                    </div>
                    {/* <div className="col-md-8 bg-warning">
                        <ChatRoom />
                    </div> */}
                </div>
            </div>
        </Layout>
    )
}

export default ChatUi