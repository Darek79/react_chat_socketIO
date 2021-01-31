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
import {ChatUserList} from "./chat_user_list";
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
  const [chat, setChat] = useState([]);
  const [input, setInput] = useState({});
  const [users, setUsers] = useState([]);
  const myText = useRef(null);
  const myIdRef = useRef(v4());
  const myMsgId = useRef(0);
  const myChatName = useRef(null);
  const loadRef = useRef(false);

  const setTxtFn = useCallback((e) => {
    if (e.key === "Enter") {
      console.log("1");
      setInput(() => ({
        msg: myText.current.textContent,
        timestamp: Math.floor(Date.now()),
        id: `${Date.now()}${myMsgId.current++}`,
        name: myChatName.current.name,
        avt: myChatName.current.avatar,
      }));
      myIdRef.current = v4();
    }
  });

  // const cb = (msg) => {
  //   setChat((p) => [...p, msg]);
  //   console.log(msg);
  // };
  const cb = useCallback(
    (msg) => {
      setChat((p) => [...p, msg]);
      console.log(msg);
    },
    [setChat]
  );
  const cbUsers = useCallback(
    (msg) => {
      setUsers((p) => [...p, msg]);
      console.log(msg, "user msg");
    },
    [setUsers]
  );

  useEffect(() => {
    myChatName.current = JSON.parse(
      localStorage.getItem("profile")
    );
    if (input && loadRef.current === true) {
      console.log("input");
      socket.emit("msg", input);
    }
    console.log(socket);
  }, [input]);
  useEffect(() => {
    if (
      !loadRef.current &&
      myChatName.current.name
    ) {
      socket.emit(
        "userEntry",
        myChatName.current.name
      );
      socket.on("userIn", cbUsers);
    }
  }, []);
  useEffect(() => {
    socket.on("chat", cb);
    if (!loadRef.current) {
      loadRef.current = true;
    }
    return () => socket.off("chat", cb);
  }, []);

  // (msg) => {
  //   console.log(msg, "---msg");
  //   // const {chatText} = msg;
  //   // console.log(`${chatText} chat`);
  //   // setChat((p) => [...p, chatText]);
  // }

  return (
    <section className="chat_wrapper">
      {console.log(users.length > 0 && users)}
      <ChatUserList msg={users} />
      <ChatWindow msg={chat} />
      <ChatInput
        myText={myText}
        myIdRef={myIdRef}
        fnGet={setTxtFn}
      />
    </section>
  );
};
