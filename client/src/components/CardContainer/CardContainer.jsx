import { useSelector } from "react-redux";
import { useState } from "react";
import Card from "../Card/Card";
import Pagination from "../Pagination/Pagination";

const CardContainer = ({ loading }) => {
  const [currentPage, setCurretPage] = useState(1);
  const [postsPerPage] = useState(10);

  const countries = useSelector((state) => state.countriesDefault);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = countries.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurretPage(pageNumber);

  return (
    <div>
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
