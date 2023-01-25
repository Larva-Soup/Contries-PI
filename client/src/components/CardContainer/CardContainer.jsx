import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import Card from "../Card/Card";
import Pagination from "../Pagination/Pagination";
import {continents} from "./cardContainerHelper.js"
import {filterByContinent, orderByName} from "../../redux/actions.js"

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
    document.getElementById("names").value = "default"
    dispatch(filterByContinent(e.target.value))

  }

  const orderAlphabetically = (e) => {
    dispatch(orderByName(e.target.value))
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
          <select onChange={(e) => orderAlphabetically(e)} id="names">
            <option value="default">--Order Alphabetically--</option>
            <option value="asc">Ascendent</option>
          <option value="desc">Descendent</option></select>
        </span>
        <span>
          <select><option value="">--Order by population--</option>
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
