import React, { useState } from "react";
import { Link } from "react-router-dom";
import style from "./Pagination.module.css";

const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
  const pageNumber = [];

  const [isValid, setIsValid] = useState({
    head: false,
    tail: true,
  });

  const ceiling = Math.ceil(totalPosts / postsPerPage);

  for (let i = 1; i <= ceiling; i++) {
    pageNumber.push(i);
  }

  // const location = useLocation().search;
  // let aux = location.slice(6);

  // if(aux*1 === 0) aux = 1;
  // if(aux*1 > ceiling) aux = ceiling;

  const headHandler = (number) => {
    if (number * 1 === 0) {
      setIsValid({ ...isValid, head: false, tail: true });
    } else {
      setIsValid({ ...isValid, head: true, tail: true });
      paginate(number);
    }
  };

  const tailHandler = (number) => {
    if (number > ceiling) {
      setIsValid({ ...isValid, head: true, tail: false });
    } else {
      setIsValid({ ...isValid, tail: true, head: true });
      paginate(number);
    }
  };

  let customHeadLink = isValid.head
    ? `?page=${currentPage - 1}`
    : `?page=${currentPage}`;

  let customTailLink = isValid.tail
    ? `?page=${currentPage + 1}`
    : `?page=${currentPage}`;

  return (
    <div>
      <nav className={style.pagination}>
        <ul>
          <li>
            <Link to={customHeadLink}>
              <button
                className={isValid.head ? style.button : style.disabled}
                onClick={() => headHandler(currentPage - 1)}
                id="head"
              >
                {"<< Back"}
              </button>
            </Link>
          </li>
          {pageNumber.map((number) => (
            <li key={number}>
              <Link to={`?page=${number}`}>
                <button
                  className={number === currentPage * 1 ? style.selected : style.button}
                  onClick={() => paginate(number)}
                  id={number}
                >
                  {number}
                </button>
              </Link>
            </li>
          ))}
          <li>
            <Link to={customTailLink}>
              <button
                className={isValid.tail ? style.button : style.disabled}
                onClick={() => tailHandler(currentPage + 1)}
                id="tail"
              >
                {"Next >>"}
              </button>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
