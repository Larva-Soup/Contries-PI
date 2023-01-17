import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountry } from "../../redux/actions";

const Detail = () => {
  const country = useSelector((state) => state.countries);
  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    dispatch(getCountry(id));
  }, [dispatch, id]);
  return (
    <div>
      <img src={country.flags} alt={`${country.name}'s flag` } height="300px" width="500px" />
      <h3>{country.name}</h3>
      <p>Continent: {country.continents}</p>
      <p>id(cca3): {country.id}</p>
      <p>Capital: {country.capital}</p>
      <p>Subregion: {country.subregion}</p>
      <p>Area: {country.area} km²</p>
      <p>Population: {country.population}</p>
      {country.turistActivities && country.turistActivities.length !== 0 && <><hr></hr> <h3>Turist Activities</h3></>}
      {country.turistActivities && country.turistActivities.length !== 0 &&
        country.turistActivities.map((activity) => {
          return (
            <div key={activity.id}>
              <h4>Activity Name: {activity.name}</h4>
              <p>Difficulty: {activity.difficulty}</p>
              <p>Duration: {activity.duration} hh/mm/ss</p>
              <p>Season: {activity.season}</p>
            </div>
          );
        })}
    </div>
  );
};

export default Detail;
