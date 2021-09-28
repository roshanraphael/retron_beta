import React, { useState, useEffect } from "react";
import fetch from "isomorphic-fetch";
import { isAuth } from "../../actions/auth";

const MessageBox = () => {
  const [getMessage, setGetMessages] = useState("");

  const sendMessage = (id) => {
    let name = isAuth().name;
    const message = {
      messagesSender: name,
      mess: getMessage,
    };
    return fetch(`http:/localhost:8000/api/sendmessages/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    })
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .catch((err) => console.log(err));
  };

  const messagesInput = () => {
    return (
      <form>
        <div className="form-group pt-3 pb-3">
          <input
            type="text"
            onChange={(e) => setGetMessages(e.target.value)}
            value={getMessage}
            className="form-control"
            placeholder="message"
          />
        </div>
        <a
          className="btn btn-primary"
          onClick={() => sendMessage({ id: room._id })}
        >
          Send
        </a>
      </form>
    );
  };

  return (
    <div>
      <h1>MessageBox</h1>
      {messagesInput()}
    </div>
  );
};

export default MessageBox;
