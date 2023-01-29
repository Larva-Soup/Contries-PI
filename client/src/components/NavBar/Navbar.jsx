import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { clearFilters, searchByName } from "../../redux/actions";
import style from "./Navbar.module.css";

const Navbar = () => {
  const dispatch = useDispatch();

  const [query, setQuery] = useState("");
  const [warning] = useState(
    "The search might return countries which official name in their official tongue match with the search input"
  );

  const inputHandler = (e) => {
    setQuery(e.target.value);
  };

  const reloadHome = () => {
    dispatch(clearFilters());
  };

  const submitSearchHandler = (e) => {
    e.preventDefault();
    if (!query) return;
    dispatch(searchByName(query));
    setQuery("");
  };

  return (
    <div className={style.navbar}>
      <Link to="/home">
        <span onClick={reloadHome} className={style.element}>
          Home
        </span>
      </Link>
      <Link to="/create">
        <span className={style.element}>Create</span>
      </Link>
      <span className={style.element}>
        <form onSubmit={(e) => submitSearchHandler(e)} className={style.form}>
          <label>Search Country</label>
          <input type="text" value={query} onChange={inputHandler} />
          <button type="submit">Search</button>
        </form>
      </span>
      {query && <span className={style.warning}>{warning}</span>}
    </div>
  );
};

export default Navbar;
