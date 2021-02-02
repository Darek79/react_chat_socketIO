import React, {useState, useEffect} from "react";
import {useLocation} from "react-router-dom";
import {imgArr} from "./../helperFN/helperFn";
import {ChatMsg} from "./chat_message";
import {NavLink} from "react-router-dom";
import "./../styles/profile.scss";
import "./../styles/chatmsg.scss";
export const Profile = () => {
  const {
    state: {username},
  } = useLocation();

  const [index, setIndex] = useState(0);
  const [ready, setReady] = useState(false);
  const [save, setSave] = useState(false);
  const onIndex = (e) => {
    setIndex(
      () =>
        e.target.getAttribute("data-index") * 1
    );
  };
  const saveToStorage = () => {
    setSave(() => true);
    window.localStorage.setItem(
      "profile",
      JSON.stringify({
        name: username,
        avatar: index,
      })
    );
  };

  useEffect(() => {
    let clear;
    if (localStorage.getItem("profile")) {
      setReady(true);
    }
    if (save && localStorage.getItem("profile")) {
      setReady(true);
      clear = setTimeout(() => {
        setSave(() => false);
      }, 700);
    }
    return () => clearTimeout(clear);
  }, [save]);
  return (
    <section className="profile_wrapper">
      <div className="chat_custom">
        <ChatMsg
          avatar={imgArr[index]}
          username={username}
        />
      </div>

      <div className="avatars">
        <div className="profile_desc">
          PLEASE CHOOSE A AVATAR:
        </div>
        <div className="avatar_pics_wrapper">
          <span>
            {imgArr.map((el, i) => {
              return (
                <img
                  onClick={onIndex}
                  className="avatar_item"
                  key={el}
                  src={el}
                  alt="avatar"
                  data-index={i}
                />
              );
            })}
          </span>
        </div>
      </div>
      <div className="chat_btn_wrapper">
        <button
          className={`chat_btn ${
            save ? "chat_btn_saved" : ""
          }`}
          onClick={saveToStorage}>
          SAVE MY PROFILE
        </button>
        {ready ? (
          <NavLink
            className="chat_btn a_link"
            to="/chat">
            jump to chat
          </NavLink>
        ) : (
          <button
            className="chat_btn"
            disabled={true}>
            JUMP TO CHAT
          </button>
        )}
      </div>
    </section>
  );
};
