import style from "./Card.module.css";
import { Link } from "react-router-dom";

const Card = ({ name, flags, continents, id, population }) => {
  return (
    <Link to={`/${id}`}>
      <div className={style.card} id={id}>
        <h3>{name}</h3>

        <img src={flags} alt={`${name}'s flag`} className={style.flag} />

        <h4>Continent: {continents}</h4>
        <h4>Population: {population}</h4>
      </div>
    </Link>
  );
};

export default Card;
