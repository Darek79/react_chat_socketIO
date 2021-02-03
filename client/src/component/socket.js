/* eslint-disable */
import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import {v4} from "uuid";
import {ChatWindow} from "./chat_window";
import {ChatInput} from "./chat_Input";
import {
  useLocation,
  Link,
} from "react-router-dom";
import {io} from "socket.io-client";
const socket = io("http://localhost:5000", {
  extraHeaders: {
    "my-custom-header": "abcd",
  },
});

import "./../styles/socket.scss";
export const Chat = (props) => {
  const [input, setInput] = useState([]);
  const myText = useRef(null);
  const myIdRef = useRef(v4());
  const myMsgId = useRef(0);
  const myChatName = useRef(null);

  const setTxtFn = useCallback((e) => {
    if (e.key === "Enter" && input.length === 0) {
      console.log("1");
      setInput(() => [
        {
          msg: myText.current.textContent,
          timestamp: Math.floor(Date.now()),
          id: `${Date.now()}${myMsgId.current++}`,
          name: myChatName.current,
        },
      ]);
      myIdRef.current = v4();
    }

    if (e.key === "Enter" && input.length > 0) {
      console.log("1");
      setInput((p) => [
        ...p,
        {
          msg: myText.current.textContent,
          timestamp: Math.floor(Date.now()),
          id: `${Date.now()}${myMsgId.current++}`,
          name: myChatName.current,
        },
      ]);
      myIdRef.current = v4();
    }
  });

  useEffect(() => {
    myChatName.current = JSON.parse(
      localStorage.getItem("profile")
    ).name;
    if (
      input.length > 0 &&
      input[input.length - 1].name ===
        myChatName.current
    ) {
      socket.emit(
        "msg",
        input[input.length - 1]
      );
    }

    socket.on("chat", (msg) => {
      const {chatText} = msg;
      console.log(`${chatText} chat`);
      setInput((p) => [...p, chatText]);
    });
  }, [input]);
  // useEffect(() => {}, []);
  return (
    <section className="chat_wrapper">
      <Link to="/">link</Link>
      <ChatWindow msg={input} />
      <ChatInput
        myText={myText}
        myIdRef={myIdRef}
        fnGet={setTxtFn}
      />
      {console.log(input)}
    </section>
  );
};
