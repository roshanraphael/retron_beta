import React, {useEffect, useState} from 'react'
import Layout from '../components/Layout'
import fetch from 'isomorphic-fetch';
import Router from 'next/router';
import Link from 'next/dist/client/link'
import { getUsers } from '../actions/auth'
import { isAuth } from '../actions/auth';
const SelectUser = () => {

    const [users, setUser] = useState([]);
    const [checked, setChecked] = useState([]);
    const [roomName, setRoomName] = useState('')
    // const [userHost, setUserHost] = useState('')
    useEffect(() => {
        loadUsers();
    }, []);
    
    const loadUsers = () => {
        getUsers().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                console.log(data)
                setUser(data);
            }
        });
    };

    const handleToggle = user => () => {
        // return the first index or -1
        const clickedCategory = checked.indexOf(user);
        const all = [...checked];

        if (clickedCategory === -1) {
            all.push(user);
        } else {
            all.splice(clickedCategory, 1);
        }
        console.log(all);
        setChecked(all);
    };

    const showAllUsers = () => {
        return users.map((user, i) => {
            return (
                <li key={i} className="list-unstyled">
                    <input onChange={handleToggle(user._id)} type="checkbox" className="mr-2" />
                    <label className="form-check-label">{user.name}</label>
                </li>
            );
        });
    };
    // const roomCreate = ( checked, roomName) => {
    //    let userHost = isAuth().name
    //     for( let i = 0; i < checked.length; i++){ 
    //         if ( checked[i] === userHost) { 
    //             checked.splice(i, 1); 
    //         }
    //     }
    //     console.log("checked", checked)
    //     fetch.post('/api/registerroom', {userHost, checked, roomName}).then(res => {
    
    //     }).catch(err => console.log(err))
    // }

    const roomCreate = (checked, roomName) => {
        let userHost = isAuth()._id
        let userAdded = checked
        console.log(userAdded)
        let room = {roomName, userHost, userAdded}
        return fetch(`http://localhost:8000/api/registerroom`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(room)
        })
        .then(response => {
            Router.push(`/chatrooms`)
            return console.log(response.json());
        })
        .catch(err => console.log(err));
    }

    const form = () => {
        return(
            <form>
                <div className="form-group pt-3 pb-3">
                    <input
                            type="text"
                            onChange={e => setRoomName(e.target.value)}
                            value={roomName}
                            className="form-control"
                            placeholder="RoomName"
                        />
                </div>
            </form>
        )
    }

    return(
        <Layout>
            <div>
                <h1>
                    SelectUser
                </h1>
                <Link href="/chatUi">
                    <a>go back</a>
                </Link>
                <div className="container-fluid">
                    {showAllUsers()}
                    {form()}
                    <div>
                        <button className="btn btn-primary" onClick={() => roomCreate(checked, roomName)}>
                            Create Room
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default SelectUser