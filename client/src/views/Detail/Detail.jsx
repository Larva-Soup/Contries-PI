import { useParams } from "react-router-dom";
// import axios from "axios";
import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountry } from "../../redux/actions";

// const getData = async(id) =>{
//   const countryDetail = (await axios.get(`http://localhost:3001/countries/${id}`)).data;
//   return countryDetail;
// }

const Detail = () => {

  const country = useSelector(state => state.countries)
  const dispatch = useDispatch()

  const {id} = useParams();

  // const [country, setCountry] = useState({
  //   flags: "",
  //   name: "",
  //   continents: "",
  //   id: "",
  //   capital: "",
  //   subregion: "",
  //   area: 0,
  //   population: 0,
  //   // TuristActivity: {}
  // })

  // useEffect(()=>{
  //   async function fetchData(){
  //     const data = await getData(id)
  //     setCountry({ ...data})
  //   }
  //   fetchData();    
  // }
  //   ,[id])

  useEffect(()=>{
    dispatch(getCountry(id))
  },[dispatch, id]);
  
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