/* eslint-disable */
import React, {useState, useEffect} from "react";
import {ChatWindow} from "./chat_window";
import {ChatInput} from "./chat_Input";
import {
  useLocation,
  Link,
} from "react-router-dom";
import {io} from "socket.io-client";
// const socket = io("http://localhost:5000", {
//   extraHeaders: {
//     "my-custom-header": "abcd",
//   },
// });

import "./../styles/socket.scss";
import img1 from "./../assets/rbt1.png";
import img2 from "./../assets/rbt2.png";
const arr = [
  {
    id: 1,
    txt: "lacinia rutrum est, sed bibendum velit",
  },
  {
    id: 2,
    txt: "lacinia rutrum est, sed bibendum velit",
  },
  {
    id: 2,
    txt: "lacinia",
  },
];

const avt = [
  {id: 1, img: img1},
  {id: 2, img: img2},
];
export const Chat = (props) => {
  const [text, setText] = useState("");
  // const {
  //   state: {username},
  // } = useLocation();
  // useEffect(() => {
  //   {
  //     socket.emit("msg", "test klsdflskjdsds");
  //     socket.on("chat", (msg) => {
  //       const {chatText} = msg;
  //       console.log(`${chatText} chat`);
  //       setText(chatText);
  //     });
  //   }
  // }, []);
  useEffect(() => {}, []);
  return (
    <section className="chat_wrapper">
      <Link to="/">link</Link>
      <ChatWindow />
      <ChatInput />
    </section>
  );
};
