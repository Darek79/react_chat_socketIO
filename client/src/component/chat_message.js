export const ChatMsg = ({avatar, message = "message message message"}) => (
  <li className="chatmsg">
    <span>
      <img className="avatar" src={avatar} alt="avatar" />
    </span>
    <span className="chatspan">{message}</span>
  </li>
);
