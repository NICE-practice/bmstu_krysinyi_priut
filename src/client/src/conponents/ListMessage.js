import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import MessageCard from "./MessageCard";
import "../style/Message.css";
// import PaginationComponent from "./PaginationComponent";
import Pages from "./Pages";
const ListMessage = observer(() => {
  const { message } = useContext(Context);
  console.log(message.messages);

  return (
    <div className="listmes">
      {message.messages.map((mes) => (
        <MessageCard key={mes.messageId} messageItem={mes} />
      ))}
      {/* <PaginationComponent /> */}
      <Pages />
    </div>
  );
});

export default ListMessage;
