import {ChatMsg} from "./chat_message";

export const ChatWindow = ({msg, avt}) => (
  <section className="chat_window">
    <ul className="chat_ul">
      {msg.map((el, i) => {
        {
          /* console.log(el.id);
        console.log(avt[el.id - 1].img); */
        }
        return <ChatMsg key={i} message={el.txt} avatar={avt[el.id - 1].img} />;
      })}
    </ul>
  </section>
);
