import React, { useState } from "react";
import { updateMessage } from "../http/messageApi";
import "../style/Message.css";
import dog from "../img/mes.jpg";

export default function MessageCard(messageItem) {
  const [status, setStatus] = useState("");
  let item = JSON.parse(JSON.stringify(messageItem));
  const click = async () => {
    try {
      let data;
      console.log(status);
      data = await updateMessage(status, item.messageItem.messageId);
      console.log(data);
    } catch (e) {
      alert(e.response.data.message);
    }
  };
  return (
    <div className="message_body">
      <div className="bordermes"></div>
      <div className="content_body">
        <div className="messageimg">
          <img className="messageimg" src={dog} />
        </div>
        <div className="message_content">
          <div className="line_message">
            <p>{item.messageItem.email}</p>
            <p>{item.messageItem.phone}</p>
          </div>
          <div className="message_lanel">
            <p className="message_lanel_text">{item.messageItem.messageText}</p>
          </div>
          <div className="message_lanel">
            Предпочтительный способ связи:{" "}
            {item.messageItem.preferredContactMethod}
          </div>
          <div className="line_message">
            Статус сообщения
            <form className="mt-30" method="PATCH">
              <select
                name="course"
                size="1"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="false">Ждите ответа</option>
                <option value="true">Обработано</option>
              </select>
              <input
                onClick={click}
                className="butpush"
                type="submit"
                value="Сохранить"
              ></input>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
