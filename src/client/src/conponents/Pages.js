import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
// import { Pagination } from "react-bootstrap";
import "../style/Message.css";

const Pages = observer(() => {
  const { message } = useContext(Context);
  console.log(message.totalCount);
  const pageCount = Math.ceil(message.totalCount / message.limit);
  const currentPage = message.page;
  const pages = [];
  if (pageCount > 10) {
    if (currentPage > 5) {
      for (let i = currentPage - 4; i <= currentPage + 5; i++) {
        pages.push(i);
        if (i == pageCount) break;
      }
    } else {
      for (let i = 1; i <= 10; i++) {
        pages.push(i);
        if (i == pageCount) break;
      }
    }
  } else {
    for (let i = 1; i <= pageCount; i++) {
      pages.push(i);
    }
  }

  return (
    <div className="pages">
      {pages.map((page, index) => (
        <span
          key={index}
          className={currentPage == page ? "current-page" : "page"}
          onClick={() => message.setPage(page)}
        >
          {page}
        </span>
      ))}
    </div>
  );
});

export default Pages;
