import Head from 'next/head'
import Link from "next/link"  
import Router from 'next/router';
import React, {useState, useEffect} from 'react'
import { login, authenticate, isAuth } from '../actions/auth';
import AOS from 'aos'
const Login = () => {
    
    const [values, setValues] = useState({
        email: '',
        password: '',
        error: '',
        loading: false,
        message: '',
        showForm: true
    });

    useEffect(() => {
        AOS.init({
            duration:1200
        })
        isAuth() && Router.push(`/chatrooms`);
    }, []);
    const { email,  password, error, loading, message, showForm } = values;

    const handleSubmit = e => {
        e.preventDefault();

        console.table({email, password, error, loading, message, showForm });
        setValues({ ...values, loading: true, error: false });
        const user = { email, password };

        login(user).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, loading: false });
            } else {
                console.log(data)
                // save user token to cookie
                // save user info to localstorage
                // authenticate user
                authenticate(data, () => {
                    if (isAuth()) {
                        Router.push(`/chatrooms`);
                    } else {
                        Router.push(`/`);
                    }
                });
            }
        });
        
    };

    const handleChange = name => e => {
        setValues({ ...values, error: false, [name]: e.target.value });
    };

    const loginForm = () => {
        return (
            <form onSubmit={handleSubmit} >
                <div className="form-group pt-3 pb-3">
                <input
                        type="email"
                        value={email}
                        onChange={handleChange('email')}
                        className="form-control"
                        placeholder="Type your email"
                    />
                </div>

                <div className="form-group">
                <input
                        type="password"
                        value={password}
                        onChange={handleChange('password')}
                        className="form-control"
                        placeholder="Type your password"
                    />
                </div>

                <div className="p-4 row d-flex justify-content-center">
                    <div className="col pt-3 d-flex justify-content-center">
                    <button className="btn btn-dark btn-block p-5" style={{borderRadius:"20%"}}>LOG IN</button>
                    </div>
                    <div className="col d-flex justify-content-center align-item-center">
                    <h5 className="p-5">OR</h5>
                    </div>
                    <div className="col pt-3 d-flex justify-content-center">
                        <Link href="/register">
                    <button className="btn btn-block btn-dark p-3" style={{borderRadius:"20%"}}>CREATE AN ACCOUNT</button></Link>
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
            <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet"></link>
                </Head>
                <div className="container-fluid pt-5">
                    <div className="container-fluid"style={{backgroundColor:"#0095b6"}} data-aos="fade-up" >
                        <div className="">
                            <div className="">
                                {loginForm()}
                            </div>
                        </div>
                    </div>
                </div>
                <br />
            </>
    );
};

export default Login;