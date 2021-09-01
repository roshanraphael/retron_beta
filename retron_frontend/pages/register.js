import Router from 'next/router';
import Head from 'next/head'
import Link from "next/link"  
import React, { useState } from 'react'
import { register } from '../actions/auth';

const Register = () => {

    const [values, setValues] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
        error: '',
        loading: false,
        message: '',
        showForm: true
    });
    const { name, username, email,  password, error, loading, message, showForm } = values;

    const handleSubmit = e => {
        e.preventDefault();

        console.table({ name, email, password, error, loading, message, showForm });
        setValues({ ...values, loading: true, error: false });
        const user = { name, username, email, password };

        register(user).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, loading: false });
            } else {
                setValues({
                    ...values,
                    name: '',
                    username: '',
                    email: '',
                    password: '',
                    error: '',
                    loading: false,
                    message: data.message,
                    showForm: false
                });
                Router.push(`/`);
            }
        });
        
    };

    const handleChange = name => e => {
        setValues({ ...values, error: false, [name]: e.target.value });
    };

    const registerForm = () => {
        return (
            <form onSubmit={handleSubmit} >
                <div className="form-group pt-3 pb-3">
                <input
                        type="name"
                        value={name}
                        onChange={handleChange('name')}
                        className="form-control"
                        placeholder="Type your name"
                    />
                </div>
                <div className="form-group pb-3">
                <input
                        type="userName"
                        value={username}
                        onChange={handleChange('username')}
                        className="form-control"
                        placeholder="Type your username"
                    />
                </div>                
                <div className="form-group pb-3">
                    <input
                        type="email"
                        value={email}
                        onChange={handleChange('email')}
                        className="form-control"
                        placeholder="Type your email"
                    />
                </div>
                <div className="form-group pb-3">
                    <input
                        type="password"
                        value={password}
                        onChange={handleChange('password')}
                        className="form-control"
                        placeholder="Type your password"
                    />
                </div>

                <div className=" row d-flex justify-content-center">
                    <div className="col-12 p-2 d-flex justify-content-center">
                    <button className="btn btn-dark btn-block">Register</button>
                    </div>
                </div>
            </form>
        );
    };
    
    return (
            <>
                <Head>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" 
                    integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We" crossorigin="anonymous"/>
                </Head>
                <div className="container-fluid pt-5 pb-5 bg-white" style={{height:"650px"}}>
                    <div className="">
                    <div className="container p-5" style={{ backgroundColor:"#0095b6", borderBottomLeftRadius: 40, borderBottomRightRadius:40, borderTopRightRadius: 40, borderTopLeftRadius: 40}} >
                        <div className="row d-flex justify-content-center align-item-center">
                            <div className=" col-md">
                                {registerForm()}
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
                <br />
            </>
    );
};

export default Register;