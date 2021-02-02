import "./../styles/chatmsg.scss";

export const ChatMsg = ({
  avatar,
  username,
  message = "Nulla consectetur fringilla nulla",
}) => (
  <li className="chatmsg_wrapper">
    <div className="chat_item">
      <img
        className="avatar_img"
        src={avatar}
        alt="avatar"
      />
      <span className="username">{username}</span>
      <span className="chatmsg">{message}</span>
    </div>
  </li>
);
