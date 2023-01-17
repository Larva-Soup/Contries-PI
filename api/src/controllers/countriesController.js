const { Country, TuristActivity } = require("../db");
const axios = require("axios");

const colador = (arr) => {
  return arr.map((country) => {
    return {
      id: country.cca3,
      name: country.name.common,
      //también podria ir por traducciones al español:
      //name: country.translations.spa.common
      flags: country.flags[1], //esto trae el png
      continents: country.continents[0],
      capital: Array.isArray(country.capital)
        ? country.capital[0]
        : country.capital,
      subregion: country.subregion,
      area: country.area,
      population: country.population,
    };
  });
};

const saveAllCountries = async () => {

  const apiCountriesRaw = (await axios.get("https://restcountries.com/v3/all"))
    .data;

  const apiCountries = colador(apiCountriesRaw);

  apiCountries.forEach(ele =>{
    Country.findOrCreate({
        where:{
            id: ele.id,
            name: ele.name,
            flags: ele.flags,
            continents: ele.continents,
            capital: ele.capital || "none",
            subregion: ele.subregion || "none",
            area: ele.area,
            population: ele.population
        }
    })
  })
  
};

const getAllCountries = async () => {
    const dbQuery = await Country.findAll()

    if(dbQuery.length === 0) await saveAllCountries() 
    
    return await Country.findAll({
        attributes:['id', 'name', 'flags', 'continents']
        
    })
  
};

const addActivitytoCountry = async(id) =>{
  return await Country.findAll({where:{id:id},
  include:{
    model: TuristActivity
  }})
}

const getCountryById = async (idPais) => {
  const countryByIdRaw = (
    await axios.get(`https://restcountries.com/v3/alpha/${idPais}`)
  ).data;
  const countryById = colador(countryByIdRaw);
  const countryAndActivity = await addActivitytoCountry(countryById[0].id)
  return countryAndActivity[0] || countryById[0];
  
};

const searchByName = async (name) => {
  const countryByNameRaw = (
    await axios.get(`https://restcountries.com/v3/name/${name}`)
  ).data;
  const countryByName = colador(countryByNameRaw);
  return countryByName[0];
};

module.exports = { getAllCountries, getCountryById, searchByName };
