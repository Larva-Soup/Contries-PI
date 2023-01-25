import style from "./Card.module.css";
import { Link } from "react-router-dom";

const Card = ({ name, flags, continents, id, population }) => {
  return (
    <div className={style.card}>
      <img src={flags} alt={`${name}'s flag`} height="300px" width="500px" />
      <Link to={`/${id}`}>
        <h3>{name}</h3>
      </Link>

      <h4>Continent: {continents}</h4>
      <h4>Population: {population}</h4>
    </div>
  );
};

export default Card;
