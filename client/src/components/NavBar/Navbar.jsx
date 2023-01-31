import { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { clearFilters, searchByName } from "../../redux/actions";
import style from "./Navbar.module.css";

const Navbar = () => {
  const dispatch = useDispatch();

  const [query, setQuery] = useState("");
  // const [warning] = useState(
  //   "The search might return countries which official name in their official tongue match with the search input"
  // );

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
      <NavLink to="/home" activeClassName={style.activePath}>
        <span onClick={reloadHome} className={style.route}>
          Home
        </span>
      </NavLink>
      <NavLink to="/create" activeClassName={style.activePath}>
        <span className={style.route}>Create</span>
      </NavLink>
      <span className={style.element}>
        <form onSubmit={(e) => submitSearchHandler(e)} className={style.form}>
          <input
            type="text"
            value={query}
            onChange={inputHandler}
            placeholder="Search Country..."
          />
          <button type="submit">Search</button>
        </form>
      </span>
      {/* {query && <div className={style.warning}>{warning}</div>} */}
    </div>
  );
};

export default Navbar;
