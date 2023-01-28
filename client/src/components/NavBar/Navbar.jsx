import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { searchByName } from "../../redux/actions";

const Navbar = () => {

    const history = useHistory();

    const dispatch = useDispatch()

    const [query, setQuery] = useState("");

    const inputHandler = (e) =>{
        setQuery(e.target.value)
    }

    const submitSearchHandler = (e) =>{
        e.preventDefault();
        if(!query) return;
        history.push(`/home?name=${query}`)
        dispatch(searchByName(query))

    }
    
    return (<div>
        <span><Link to="/home">Home</Link></span>
        <span>  esto es temporal   </span> 
        <span><Link to="/create">Create</Link></span>
        <span><form onSubmit={(e) => submitSearchHandler(e)}><label>Search Country</label><input type="text" value={query} onChange={inputHandler}/><button type="submit">Search</button></form></span>
    </div>)
}

export default Navbar;