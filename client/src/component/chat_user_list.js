import React, {memo} from "react";
import {v1} from "uuid";
export const ChatUserList = memo(({msg}) => (
  <section className="chat_user_list">
    <p className="chat_list_desc">Users in chat:</p>
    <ul className="chat_list">
      {msg &&
        msg.map((el) => (
          <li
            key={v1()}
            className="chat_list_item">
            {el}
          </li>
        ))}
    </ul>
  </section>
));
