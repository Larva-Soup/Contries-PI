import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import Card from "../Card/Card";
import Pagination from "../Pagination/Pagination";
import { continents } from "./cardContainerHelper.js";
import {
  filterByContinent,
  orderByName,
  orderByPopulation,
} from "../../redux/actions.js";
import {
  activitiesHandler,
  clearFiltersHandler,
} from "./cardContainerHandlers";
import style from "./CardContainer.module.css";

const CardContainer = ({ loading }) => {
  const dispatch = useDispatch();

  const [currentPage, setCurretPage] = useState(1);
  const [postsPerPage] = useState(10);

  const countries = useSelector((state) => state.countries);
  const activitiesList = useSelector((state) => state.activities);

  useEffect(() => {
    setCurretPage(1);
  }, [countries]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = countries.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurretPage(pageNumber);

  const filterByContinentHandler = (e) => {
    document.getElementById("names").value = "";
    document.getElementById("population").value = "";
    document.getElementById("activities").value = "";
    dispatch(filterByContinent(e.target.value));
  };

  const alphabeticalOrderHandler = (e) => {
    document.getElementById("continents").value = "All Continents";
    document.getElementById("population").value = "";
    document.getElementById("activities").value = "";
    dispatch(orderByName(e.target.value));
  };

  const sortByPopulationHandler = (e) => {
    document.getElementById("continents").value = "All Continents";
    document.getElementById("names").value = "";
    document.getElementById("activities").value = "";
    dispatch(orderByPopulation(e.target.value));
  };

  return (
    <div className={style.cardcontainercontainer}>
      <div className={style.selectcontainer}>
        <label>Countries </label>
        <span>
          <select onChange={(e) => filterByContinentHandler(e)} id="continents" className={style.cardselect}>
            {continents.map((continent) => (
              <option value={continent.value} key={continent.value}>
                {continent.value}
              </option>
            ))}
          </select>
        </span>
        <span>
          <select
            onChange={(e) => activitiesHandler(e, dispatch)}
            id="activities"
            className={style.cardselect}
          >
            <option value="">--Select Activity--</option>
            {activitiesList &&
              activitiesList.length &&
              activitiesList.map((activity) => (
                <option key={activity.id} value={activity.name}>
                  {activity.name}
                </option>
              ))}
            {(!activitiesList || !activitiesList.length) && (
              <option>Not Activities Created Yet</option>
            )}
          </select>
        </span>
        <span>
          <select onChange={(e) => alphabeticalOrderHandler(e)} id="names" className={style.cardselect}>
            <option value="">--Sort Alphabetically--</option>
            <option value="asc">Ascend</option>
            <option value="desc">Descend</option>
          </select>
        </span>
        <span>
          <select onChange={(e) => sortByPopulationHandler(e)} id="population" className={style.cardselect}>
            <option value="">--Sort By Population--</option>
            <option value="asc">Ascend</option>
            <option value="desc">Descend</option>
          </select>
        </span>
        <span>
          <button onClick={() => clearFiltersHandler(dispatch)}>
            Clear Filters
          </button>
        </span>
      </div>
      {loading && <h2>Loading...</h2>}
      <div className={style.cardcontainer}>
        {currentPosts.map((country) => {
          return (
            <Card
              key={country.id}
              name={country.name}
              flags={country.flags}
              continents={country.continents}
              population={country.population}
              id={country.id}
            />
          );
        })}
      </div>
      <div>
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={countries.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default CardContainer;
