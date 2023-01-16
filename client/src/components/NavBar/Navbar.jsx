import { Link } from "react-router-dom";

const Navbar = () => {
    
    return (<div>
        <span><Link to="/home">Home</Link></span>
        <span>  esto es temporal   </span> 
        <span><Link to="/create">Create</Link></span>
    </div>)
}

export default Navbar;