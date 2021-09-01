import { Html, Head } from 'next/document';
import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { singleChatRoom, isAuth } from '../../actions/auth'
import axios from 'axios';
// import Router from 'next/router'

const singleChat = ({room, query}) => {
    console.log(room.message)
    const [ getMessage, setGetMessages ] = useState('')
    const[messa, setMess] = useState([])
    const [members, setMembers] = useState([])
    useEffect(() => {
        setMembers(room.userAdded)
        setMess(room.message)
        getRefresh()
    },[])
  
    const getRefresh = () => {
        setInterval(() => {
        window.location.reload()
        }, 20000);
    }

    const showAdded = () => {
        return members.map((memb, i) => {
            return (
                <div key={i} className=" row">
                    <div className="col-12">
                        <a><h3>{memb.name}</h3></a>
                    </div>
                </div>
            );
        });
    };

    const displayMess = () => {
        return messa.map((m, i) => {
            return (
                <div key={i} className=" row">
                    <div className="col-10 bg-light m-1">
                        <h4>{m.mess}</h4>
                        <p>{m.messageSender}</p>
                    </div>
                </div>
            );
        });
    }

    const sendMessage = ({id}) => {
        let name = isAuth().name
        const message = {
            messageSender : name,
            mess: getMessage
        }
        axios.put(`http://localhost:8000/api/sendmessages/${id}`,{message})
        .then(response => {
            console.log(response)
            setGetMessages('')
            window.location.reload();
            return response.json();
        })
        .catch(err => console.log(err));
    }

    const messagesInput = () => {
        return(
            <form>
                <div className="form-group pt-3 pb-3">
                    <input
                            type="text"
                            onChange={e => setGetMessages(e.target.value)}
                            value={getMessage}
                            className="form-control"
                            placeholder="message"
                        />
                </div>
            </form>
        )
    }

    return(
        <Layout>
            <div>
                <div className="row container">
                    <div className="col-sm-4 sticky-top" style={{borderRight:"6px solid skyblue", height: "100vh"}} data-aos="fade-right" data-aos-duration="1500">
                        <h3> {room.roomName}</h3>
                        <h3>Room Host: {room.userHost.name}</h3>
                        <h3>Users:</h3>
                        {showAdded()}
                        <div className=''>
                        <div className="">{messagesInput()}
                        <button className="btn btn-primary" onClick={() => sendMessage({id : room._id})}>
                            Send
                        </button>
                        </div>
                        </div>
                    </div>
                    <div className="col-sm-8" data-aos="fade-up" data-aos-duration="1500">
                        <h3>Chat Screen</h3>
                        {displayMess()}
                    </div>
                </div>
            </div>
        </Layout>
    )
}
singleChat.getInitialProps = ({query}) => {
    return singleChatRoom(query._id).then(res => {
        // console.log(res.userHost)
        if (res.error) {
            console.log(res.error)
        } else {
            return{room: res, query}
        }
    })
}

export default singleChat