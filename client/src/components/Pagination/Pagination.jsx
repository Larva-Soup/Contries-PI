import { useState } from "react";
import { Link } from "react-router-dom";
import style from "./Pagination.module.css";

const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
  const pageNumber = [];

  const [isValid, setIsValid] = useState({
    head: false,
    tail: true,
  });

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumber.push(i);
  }

  const headHandler = (number) => {
    if (number * 1 === 0) {
      setIsValid({ ...isValid, head: false, tail: true });
    } else {
      setIsValid({ ...isValid, head: true, tail: true });
      paginate(number);
    }
  };

  const tailHandler = (number) => {
    if (number > (Math.ceil(totalPosts / postsPerPage))) {
      setIsValid({ ...isValid, head: true, tail: false });
    } else {
      setIsValid({ ...isValid, tail: true, head: true });
      paginate(number);
    }
  };

  return (
    <div>
      <nav className={style.pagination}>
        <ul>
          <li>
            <button
              className={isValid.head ? style.button : style.disabled}
              onClick={(e) => headHandler(currentPage - 1)}
              id="head"
            >
              {"<< Previous"}
            </button>
          </li>
          {pageNumber.map((number) => (
            <li key={number}>
              <Link to={`?page=${number}`}>
                <button
                  className={style.button}
                  onClick={() => paginate(number)}
                  id={number}
                >
                  {number}
                </button>
              </Link>
            </li>
          ))}
          <li>
            <button
              className={isValid.tail ? style.button : style.disabled}
              onClick={() => tailHandler(currentPage + 1)}
              id="tail"
            >
              {"Next >>"}
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
