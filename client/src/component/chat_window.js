/* eslint-disable*/
import React from "react";
import {imgArr} from "./../helperFN/helperFn";
import {ChatMsg} from "./chat_message";

// import "./../styles/chat_window.scss";

export const ChatWindow = ({msg}) => {
  // const [name, setName] = useState("");
  // const [avatar, setAvatar] = useState(null);
  // useEffect(() => {
  //   const profile = JSON.parse(
  //     localStorage.getItem("profile")
  //   );
  //   if (typeof profile === "object") {
  //     setName(() => profile.name);
  //     setAvatar(() => profile.avatar);
  //   }
  //   console.log(profile);
  // }, []);
  return (
    <section className="chat_window">
      <ul className="chat_ul">
        {msg &&
          msg.map((el, i) => {
            return (
              <ChatMsg
                key={i}
                message={el.msg}
                avatar={imgArr[el.avt]}
                username={el.name}
              />
            );
          })}
      </ul>
    </section>
  );
};
