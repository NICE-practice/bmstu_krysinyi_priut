import React, { useState } from "react";
import { createMessage } from "../http/messageApi";
import "../style/Contact.css";

export default function FormContact() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState("");
  const [messageText, setMessageText] = useState("");
  const addMessage = async () => {
    try {
      let item = await createMessage(
        name,
        phone,
        email,
        messageText,
        type,
        false
      );
      console.log(item);
    } catch (e) {
      alert(e.response.data.message);
    }
  };
  return (
    <div>
      <form className="guruweba_example_form2" name="feedback">
        <div className="name_item">Имя</div>
        <input
          className="form_text"
          type="text"
          name="name"
          required="required"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div className="name_item">Телефон</div>
        <input
          className="form_text"
          type="text"
          name="telephone"
          required="required"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <div className="name_item">Ваш email</div>
        <input
          className="form_text"
          type="email"
          name="email"
          required="required"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="name_item">Предпочтительная форма связи </div>
        <input
          className="form_text"
          type="text"
          name="bestform"
          required="required"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />
        <div className="name_item">Напишите сообщение</div>
        <textarea
          className="message_text"
          name="message"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
        ></textarea>
        <button onClick={addMessage} className="form_but" type="submit">
          Отправить
        </button>
      </form>
    </div>
  );
}
