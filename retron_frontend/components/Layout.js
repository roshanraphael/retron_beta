import Head from "next/head";
import AOS from "aos";
import Router from "next/router";
import { useEffect } from "react";
import { signout } from "../actions/auth";
const Layout = ({ children }) => {
  useEffect(() => {
    AOS.init({
      duraton: 1000,
    });
  }, []);
  return (
    <React.Fragment>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css"
          integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We"
          crossOrigin="anonymous"
        />
        <link
          href="https://unpkg.com/aos@2.3.1/dist/aos.css"
          rel="stylesheet"
        ></link>
      </Head>
      <div className="p-2 d-flex justify-content-end">
        <button
          onClick={() => signout(() => Router.replace(`/`))}
          className="btn btn-primary"
        >
          Log Out
        </button>
      </div>
      <div
        className="container-fluid"
        style={{ minHeight: "100%", height: "auto", height: "100%" }}
      >
        {children}
      </div>
    </React.Fragment>
  );
};

export default Layout;
