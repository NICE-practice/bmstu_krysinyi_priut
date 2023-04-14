import React, { useContext } from "react";
import "../style/Home.css";
import cat from "../img/cat2.png";
import { Row, Col, Container } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
// import { fetchInfo } from "../http/shelterInfoApi";

const Footer = observer(() => {
  const { info } = useContext(Context);
  console.log(info.info.shelter_phone);
  return (
    <Container fluid id="footer" className="footer">
      <Row className="m-auto">
        <Col
          lg={4}
          sm={12}
          className="d-flex flex-column align-items-start justify-content-top "
        >
          <h1 className="title_footer">Для вопросов и пожеланий</h1>
          <div className="d-flex align-items-center justify-content-center">
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
            <p className="footer_text">{info.info.shelter_phone}</p>
          </div>
          <div className="d-flex flex-row align-items-center justify-content-center">
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

            <p className="footer_text">{info.info.shelter_email}</p>
          </div>
        </Col>
        <Col
          lg={4}
          sm={12}
          className="d-flex flex-column align-items-start justify-content-top"
        >
          <h1 className="title_footer">Ждем вас</h1>
          <div className="d-flex align-items-center justify-content-center">
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
            <p className="footer_text">{info.info.shelter_address}</p>
          </div>
        </Col>
        <Col lg={4} sm={12}>
          <img className="footer_img" src={cat}></img>
        </Col>
      </Row>
    </Container>
  );
});

export default Footer;
