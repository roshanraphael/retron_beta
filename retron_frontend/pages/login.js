import Head from "next/head";
import Link from "next/link";
import Router from "next/router";
import React, { useState, useEffect } from "react";
import { login, authenticate, isAuth } from "../actions/auth";
import { Paper, TextField } from "@mui/material";
import AOS from "aos";
const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    message: "",
    showForm: true,
  });

  useEffect(() => {
    AOS.init({
      duration: 1200,
    });
    isAuth() && Router.push(`/chatrooms`);
  }, []);
  const { email, password, error, loading, message, showForm } = values;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === '' || password === '') {
      setValues({ ...values, loading: false, error: "Fill Credentials" });
    } else {
      // console.table({ email, password, error, loading, message, showForm });
      setValues({ ...values, loading: true, error: false });
      const user = { email, password };
  
      login(user).then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          console.log(data);
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
    }
  };

  const handleChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };

  const loginForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <input
            type="email"
            value={email}
            onChange={handleChange("email")}
            className="form-control"
            placeholder="Type your email"
          />
        </div>
        <div className="form-group mb-3">
          <input
            type="password"
            value={password}
            onChange={handleChange("password")}
            className="form-control"
            placeholder="Type your password"
          />
        </div>

        <div className="row d-flex justify-content-center">
          <div className="col d-flex justify-content-center">
            <button className="btn text-white" style={{background: "#00acac"}}>Log In</button>
          </div>
        </div>
        <h5 style={{
          width: "100%", 
          textAlign: "center", 
          borderBottom: "1px solid #000", 
          lineHeight: "0.1em",
          margin: "20px 0px"
        }}><span style={{    background:"#fff", 
          padding: "0px 8px" 
      }}>OR </span></h5>

        {/* <div style={{ display: "grid", placeItems: "center" }}>
          <hr
            style={{
              borderTop: "1px dashed",
              width: "60%",
              textAlign: "center",
              maxWidth: "20rem",
            }}
            className="row mb-2 mt-2"
          />
        </div> */}
        <div className="row d-flex justify-content-center">
          <div className="col d-flex justify-content-center">
            <Link href="/register">
              <button className="btn text-white" style={{background: "#00acac"}}>Create an account</button>
            </Link>
          </div>
        </div>
      </form>
    );
  };

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css"
          integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We"
          crossorigin="anonymous"
        />
        <link
          href="https://unpkg.com/aos@2.3.1/dist/aos.css"
          rel="stylesheet"
        ></link>
      </Head>
      <div className="container-fluid pt-5">
        <Paper
          data-aos="fade-up"
          elevation={1}
          sx={{
            padding: "1rem",
          }}
        >
          {loginForm()}
          <div className="text-danger">
            {error ? <div className=" p-2 d-flex justify-content-center">{error}</div> : null}
          </div>
        </Paper>
        {/* <div className="container-fluid"style={{backgroundColor:"#0095b6"}} data-aos="fade-up" >
                        <div className="">
                            <div className="">
                                {loginForm()}
                            </div>
                        </div>
                    </div> */}
      </div>
      <br />
    </>
  );
};

export default Login;
