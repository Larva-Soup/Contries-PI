import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const getData = async(id) =>{
  const countryDetail = (await axios.get(`http://localhost:3001/countries/${id}`)).data;
  return countryDetail;
}

const Detail = () => {

  const {id} = useParams();

  const [country, setCountry] = useState({
    flags: "",
    name: "",
    continents: "",
    id: "",
    capital: "",
    subregion: "",
    area: 0,
    population: 0,
    //faltan las actividades turisticas pero trabajo en eso más tarde
  })

  useEffect(()=>{
    async function fetchData(){
      const data = await getData(id)
      setCountry({ ...data})
    }
    fetchData();    
  }
    ,[id])
  
  //tengo que revisar las unidades de medida del área
    return (
    <div>
      <img src={country.flags} alt={`${country.name}'s flag`} />
      <h3>{country.name}</h3>
      <p>Continent: {country.continents}</p>
      <p>id(cca3): {country.id}</p>
      <p>Capital: {country.capital}</p>
      <p>Subregion: {country.subregion}</p>
      <p>Area: {country.area} km²</p>
      <p>Population: {country.population}</p>

    </div>
  );
};

export default Detail;