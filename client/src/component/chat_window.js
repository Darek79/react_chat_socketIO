/* eslint-disable*/
import React, {useState, useEffect} from "react";
import {imgArr} from "./../helperFN/helperFn";
import {ChatMsg} from "./chat_message";

export const ChatWindow = ({msg = [0], avt}) => {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState(null);
  useEffect(() => {
    const profile = JSON.parse(
      localStorage.getItem("profile")
    );
    if (typeof profile === "object") {
      setName(() => profile.name);
      setAvatar(() => profile.avatar);
    }
    console.log(profile);
  }, []);
  return (
    <section className="chat_window">
      <ul className="chat_ul">
        {msg &&
          msg.map((el, i) => {
            return (
              <ChatMsg
                key={i}
                message={el.msg}
                avatar={imgArr[avatar]}
                username={name}
              />
            );
          })}
      </ul>
    </section>
  );
};
