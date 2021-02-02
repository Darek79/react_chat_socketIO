import React, {useState} from "react";
import Input from "./input";
import {io} from "socket.io-client";
const socket = io("http://localhost:5000");

export const ChatInput = () => {
  const [input, setInput] = useState("");

  const onInput = (e) => {
    console.log(e);
    setInput(() => e.target.value);
  };
  return (
    <section className="chat_input">
      <Input
        fnGet={onInput}
        valueProp={input}
        clName="chatmod_input"
        modus={false}
      />
    </section>
  );
};
