import React, {
  useState,
  useEffect,
  useRef,
  memo,
} from "react";
import {v4} from "uuid";
import Input from "./input";
// import {io} from "socket.io-client";
// const socket = io("http://localhost:5000");

export const ChatInput = memo(
  ({
    fnGet,
    propGet,
    myText,
    myIdRef,
  }) => {
    // const [input, setInput] = useState([]);
    // const myText = useRef(null);
    // const myIdRef = useRef(v4());
    // const myMsgId = useRef(0);

    // const onInput = (e) => {
    //   if (e.key === "Enter") {
    //     console.log("1");
    //     setInput((p) => [
    //       ...p,
    //       {
    //         msg: myText.current.textContent,
    //         timestamp: Math.floor(Date.now()),
    //         id: `${Date.now()}${myMsgId.current++}`,
    //       },
    //     ]);
    //     myIdRef.current = v4();
    //   }
    // };

    return (
      <section className="chat_input">
        <Input
          fnKey={fnGet}
          clName="chatmod_input"
          modus={false}
          valref={myText}
          id={myIdRef.current}
        />
      </section>
    );
  }
);
