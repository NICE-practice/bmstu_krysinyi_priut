import React, { useContext, useEffect } from "react";
import Menu from "../conponents/Menu";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { fetchMessages } from "../http/messageApi";
import ListMessage from "../conponents/ListMessage";
// import Pages from "../conponents/Pages";

const Operator = observer(() => {
  const { message } = useContext(Context);

  useEffect(() => {
    fetchMessages(message.page, 15).then((data) => {
      message.setMessage(data.messages);
      message.setTotalCount(data.messagesCount);
    });
  }, [message.page]);

  return (
    <div>
      <Menu />
      <ListMessage />
    </div>
  );
});
export default Operator;
