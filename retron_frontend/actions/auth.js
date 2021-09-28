import fetch from 'isomorphic-fetch';
import cookie from 'js-cookie';
import Router from 'next/router';
export const register = user => {
    return fetch(`http://localhost:8000/api/register`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const login = user => {
    return fetch(`http://localhost:8000/api/login`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const isAuth = () => {
    if (process.browser) {
        const cookieChecked = getCookie('token');
        if (cookieChecked) {
            if (localStorage.getItem('user')) {
                return JSON.parse(localStorage.getItem('user'));
            } else {
                return false;
            }
        }
    }
};

export const setCookie = (key, value) => {
    if (process.browser) {
        cookie.set(key, value, {
            expires: 1
        });
    }
};

export const removeCookie = key => {
    if (process.browser) {
        cookie.remove(key, {
            expires: 1
        });
    }
};
// get cookie
export const getCookie = key => {
    if (process.browser) {
        return cookie.get(key);
    }
};
// localstorage
export const setLocalStorage = (key, value) => {
    if (process.browser) {
        localStorage.setItem(key, JSON.stringify(value));
    }
};

export const removeLocalStorage = key => {
    if (process.browser) {
        localStorage.removeItem(key);
    }
};
// autheticate user by pass data to cookie and localstorage
export const authenticate = (data, next) => {
    setCookie('token', data.token);
    setLocalStorage('user', data.user);
    next();
};

export const getUsers = () => {
    return fetch(`http://localhost:8000/api/getusers`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
 export const getRooms = _id => {
    return fetch(`http://localhost:8000/api/getroom/${_id}`, {
        method: 'GET',
    }).then(response => {
        console.log(response)
         return response.json()
     }).catch(err => console.log(err))
 }
 export const getHostRooms = _id => {
    return fetch(`http://localhost:8000/api/gethostroom/${_id}`, {
        method: 'GET',
    }).then(response => {
        console.log(response)
         return response.json()
     }).catch(err => console.log(err))
 }
 export const singleChatRoom = (id = undefined) => {
    return fetch(`http://localhost:8000/api/chatrooms/${id}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const signout = next => {
    removeCookie('token');
    removeLocalStorage('user');
    next();

    return fetch(`http://localhost:8000/api/signout`, {
        method: 'GET'
    })
        .then(response => {
            console.log('signout success');
        })
        .catch(err => console.log(err));
};

// export const pushMessage = (id, {putMessage}) => {
//     return fetch(`http:/localhost:8000/api/sendmessages/${id}`, {
//         method: 'PUT',
//         headers: {
//             Accept: 'application/json',
//             'Content-Type': 'application/json'
//         },
//         body: {putMessage}
//     })
//     .then(response => {
//         console.log(response)
//         return response.json();
//     })
//     .catch(err => console.log(err));
// }

