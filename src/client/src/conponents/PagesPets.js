import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import "../style/Message.css";

const PagesPets = observer(() => {
  const { pet } = useContext(Context);
  console.log(pet.totalCount);
  const pageCount = Math.ceil(pet.totalCount / pet.limit);
  const currentPage = pet.page;
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
    <div className="pagespet">
      {pages.map((page, index) => (
        <span
          key={index}
          className={currentPage == page ? "current-page" : "page"}
          onClick={() => pet.setPage(page)}
        >
          {page}
        </span>
      ))}
    </div>
  );
});

export default PagesPets;
