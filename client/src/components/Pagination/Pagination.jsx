import style from "./Pagination.module.css"

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumber = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumber.push(i);
  }

  return (
    <div>
      <nav className={style.pagination}>
        <ul>
          {pageNumber.map((number) => (
            <li key={number}>
              <button className={style.button} onClick={() => paginate(number)}>{number}</button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
