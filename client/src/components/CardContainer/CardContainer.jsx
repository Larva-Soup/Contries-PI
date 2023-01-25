import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import Card from "../Card/Card";
import Pagination from "../Pagination/Pagination";
import {continents} from "./cardContainerHelper.js"
import {filterByContinent, orderByName, orderByPopulation} from "../../redux/actions.js"

const CardContainer = ({ loading }) => {
  const dispatch = useDispatch()

  const [currentPage, setCurretPage] = useState(1);
  const [postsPerPage] = useState(10);

  const countries = useSelector((state) => state.countries);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = countries.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurretPage(pageNumber);

  const filterByContinentHandler = (e) =>{
    document.getElementById("names").value = "";
    document.getElementById("population").value = "";
    dispatch(filterByContinent(e.target.value))

  }

  const alphabeticalOrderHandler = (e) => {
    dispatch(orderByName(e.target.value))
  }

  const sortByPopulationHandler = (e) => {
    dispatch(orderByPopulation(e.target.value))
  }

  return (
    <div>
      <div>
        <span>
          <select onChange={(e) => filterByContinentHandler(e)} >
            {continents.map(continent => (
              <option value= {continent.value} key={continent.value}>{continent.value}</option>
            ))}
          </select>
        </span>
        <span>
          <select><option value="">--Select activity--</option>
          <option value="clear">Everything</option></select>
        </span>
        <span>
          <select onChange={(e) => alphabeticalOrderHandler(e)} id="names">
            <option value="">--Order Alphabetically--</option>
            <option value="asc">Ascendent</option>
          <option value="desc">Descendent</option></select>
        </span>
        <span>
          <select onChange={(e) => sortByPopulationHandler(e)} id="population"><option value="">--Order by population--</option>
          <option value="asc">Ascendent</option>
          <option value="desc">Descendent</option></select>
        </span>
      </div>
      <>{loading && <h2>Loading...</h2>}</>
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

      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={countries.length}
        paginate={paginate}
      />
    </div>
  );
};

export default CardContainer;
