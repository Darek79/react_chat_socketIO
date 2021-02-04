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
import {useHistory} from "react-router-dom";
import {io} from "socket.io-client";
const socket = io("http://localhost:5000", {
  extraHeaders: {
    "my-custom-header": "abcd",
  },
});

import "./../styles/socket.scss";

export const Chat = () => {
  let history = useHistory();
  const [isConnected, setIsConnected] = useState(
    socket.connected
  );
  const isLoadedRef = useRef(false);
  const [chat, setChat] = useState([]);
  const [input, setInput] = useState({});
  const [users, setUsers] = useState([]);
  const [leave, setLeave] = useState(false);
  const myText = useRef(null);
  const myIdRef = useRef(v4());
  const myMsgId = useRef(0);
  const myChatName = useRef(
    JSON.parse(localStorage.getItem("profile"))
  );

  const setTxtFn = useCallback((e) => {
    if (e.key === "Enter") {
      //console.log("1");
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

  const removeUser = () => setLeave(true);

  const cb = (msg) => setChat((p) => [...p, msg]);

  const cbUsers = (msg) => setUsers(() => msg);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("test");
      setIsConnected(() => true);
    });
    socket.on("userIn", (user) => {
      cbUsers(user);
    });
    socket.on("chat", (chat) => {
      cb(chat);
    });
    socket.on("userLeft", (user) => {
      cbUsers(user);
    });

    return () => {
      socket.off("connect");
      socket.off("userIn");
      socket.off("chat");
      socket.off("userLeft");
    };
  });

  useEffect(() => {
    if (isConnected && leave) {
      socket.emit("logout", {
        name: myChatName.current.name,
        timestamp: Date.now(),
      });
      localStorage.removeItem("profile");
      history.push("/");
    }
  }, [leave]);

  useEffect(() => {
    if (isConnected) {
      socket.emit("msg", input);
    }
  }, [input]);

  useEffect(() => {
    if (isConnected) {
      socket.emit("userEntry", {
        name: myChatName.current.name,
        timestamp: Date.now(),
      });
    }
    isLoadedRef.current = true;
  }, [isConnected]);

  return (
    <section className="chat_wrapper">
      <ChatUserList msg={users} />
      <ChatWindow msg={chat} />
      <ChatInput
        myText={myText}
        myIdRef={myIdRef}
        fnGet={setTxtFn}
      />
      <div className="logout">
        <div
          onClick={removeUser}
          className="logout_btn">
          logout
        </div>
      </div>
    </section>
  );
};
