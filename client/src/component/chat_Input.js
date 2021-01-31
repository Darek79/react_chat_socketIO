import React, {
  useState,
  useEffect,
  useRef,
  memo,
} from "react";

import Input from "./input";

export const ChatInput = memo(
  ({fnGet, propGet, myText, myIdRef}) => {

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
