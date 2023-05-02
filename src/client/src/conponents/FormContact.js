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
      alert("Ваше сообщение отправлено");
    } catch (e) {
      alert(e.response.data.message);
    }
  };
  return (
    <div>
      <form className="guruweba_example_form2" name="feedback">
        <div className="name_item">Имя</div>
        <input
          placeholder="Введите имя"
          className="form_text"
          type="text"
          name="name"
          required="required"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div className="name_item">Телефон</div>
        <input
          placeholder="+7(___)___-__-__"
          className="form_text"
          type="tel"
          name="telephone"
          required="required"
          title="+7 (123) 456-78-91"
          pattern="[\+]\d{1}\s[\(]\d{3}[\)]\s\d{3}[\-]\d{2}[\-]\d{2}"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <div className="name_item">Ваш email</div>
        <input
          placeholder="Введите почту"
          className="form_text"
          type="email"
          name="email"
          required="required"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="name_item">Предпочтительная форма связи </div>
        <input
          placeholder="Введите предпочтительную форму связи"
          className="form_text"
          type="text"
          name="bestform"
          required="required"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />
        <div className="name_item">Напишите сообщение</div>
        <textarea
          placeholder="Введите текст сообщения"
          className="message_text"
          required="required"
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
