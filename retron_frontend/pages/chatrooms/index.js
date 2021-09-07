import React, {useEffect, useState} from 'react'
import Link from 'next/link';
import { Collapse } from 'reactstrap';
import { getRooms, getHostRooms, isAuth } from '../../actions/auth'
import Layout from '../../components/Layout'
import SelectUser from '../selectUser'
import singleChat from './[_id]';
import AOS from 'aos'

const ChatUi = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    useEffect(() => {
        AOS.init({
            duration: 1000
        });
    },[])
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
            <div className="container-fluid h-100 bg-white">
                <div className="row">
                    <div className="col-md-4" style={{borderRight:"6px solid skyblue", height: "100vh"}}
                    data-aos="fade-right" data-aos-duration="2000">
                        <h1 className="text-dark">Chat Rooms</h1>
                        {showAdded()}
                        {showHost()}               
                    </div>
                    <div className="col-md-8" data-aos="fade-up" data-aos-duration="1500">
                    <div className="d-flex justify-content-center align-item-center">
                            <a onClick={toggle} style={{ marginBottom: '1rem', cursor: 'pointer' }}className="text-primary"><h3>Create Room</h3></a>
                        </div>
                    <Collapse isOpen={!isOpen}>
                            <div className="container">
                                <SelectUser/>
                            </div>
                        </Collapse>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default ChatUi