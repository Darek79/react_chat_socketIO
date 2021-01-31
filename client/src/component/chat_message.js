import "./../styles/chatmsg.scss";

export const ChatMsg = ({
  avatar,
  username,
  message,
}) => (
  <li className="chatmsg_wrapper">
    <div className="chat_item">
      <img
        className="avatar_img"
        src={avatar}
        alt="avatar"
      />
      <span className="username">{username}</span>
      <div className="chatmsg">{message}</div>
    </div>
  </li>
);
