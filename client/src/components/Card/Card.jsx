import style from "./Card.module.css";

const Card = ({ name, flags, continents }) => {
  return (
    <div className={style.card}>
      <img src={flags} alt={`${name}'s flag`} />
      <h3>{name}</h3>
      <h4>Continent: {continents}</h4>
    </div>
  );
};

export default Card;
