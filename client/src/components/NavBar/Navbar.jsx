import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { clearFilters, searchByName } from "../../redux/actions";

const Navbar = () => {
  const dispatch = useDispatch();

  const [query, setQuery] = useState("");
  const [warning] = useState("The search might return countries which official name in it's official tongue match with the search input");

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
    <div>
      <span onClick={reloadHome}>
        <Link to="/home">Home</Link>
      </span>
      <span> esto es temporal </span>
      <span>
        <Link to="/create">Create</Link>
      </span>
      <span>
        <form onSubmit={(e) => submitSearchHandler(e)}>
          <label>Search Country</label>
          <input type="text" value={query} onChange={inputHandler} />
          <button type="submit">Search</button>
        </form>
      </span>{query.length > 0 && <span>{warning}</span> }
    </div>
  );
};

export default Navbar;
