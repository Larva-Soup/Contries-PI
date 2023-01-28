import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { clearFilters, searchByName } from "../../redux/actions";
import style from "./Navbar.module.css";

const Navbar = () => {
  const dispatch = useDispatch();

  const [query, setQuery] = useState("");
  const [warning] = useState(
    "The search might return countries which official name in it's official tongue match with the search input"
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
        <span onClick={reloadHome} className={style.element}>
          <Link to="/home">Home</Link>
        </span>
        <span className={style.element}>
          <Link to="/create">Create</Link>
        </span>
        <span className={style.element}>
          <form onSubmit={(e) => submitSearchHandler(e)} className={style.form}>
            <label>Search Country</label>
            <input type="text" value={query} onChange={inputHandler} />
            <button type="submit">Search</button>
          </form>
        </span>
        {query.length > 0 && <span className={style.warning}>{warning}</span>}
      </div>
  );
};

export default Navbar;
