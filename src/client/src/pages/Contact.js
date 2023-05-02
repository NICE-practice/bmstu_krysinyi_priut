import React, { useContext } from "react";
import FormContact from "../conponents/FormContact";
import HeaderContact from "../conponents/HeaderContact";
import Persons from "../conponents/Persons";
import "../style/Contact.css";
import { Context } from "../index";

export default function Contact() {
  const { info } = useContext(Context);
  return (
    <div className="section_contact">
      <HeaderContact />
      <div className="inf_line">
        <FormContact />
        <div className="inf_block">
          <div className="inf_line">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="30px"
              width="30px"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="#FFE4C4"
            >
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
            <p className="inf_text">{info.info.shelter_address}</p>
          </div>
          <div className="inf_line">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="30px"
              width="30px"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="#FFE4C4"
            >
              <path
                fillRule="evenodd"
                d="M7 2a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V4a2 2 0 00-2-2H7zm3 14a1 1 0 100-2 1 1 0 000 2z"
                clipRule="evenodd"
              />
            </svg>
            <p className="inf_text"> {info.info.shelter_phone}</p>
          </div>
          <div className="inf_line">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="30px"
              width="30px"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="#FFE4C4"
            >
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>

            <p className="inf_text">{info.info.shelter_email}</p>
          </div>
        </div>
      </div>
      <Persons />
    </div>
  );
}
