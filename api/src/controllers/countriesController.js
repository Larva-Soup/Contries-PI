const { Country } = require("../db");
const axios = require('axios');

const colador = (arr) =>{
    return arr.map(country =>{
        return{
            id: country.cca3,
            name: country.name.common,
            //también podria ir por traducciones al español:
            //name: country.translations.spa.common
            flags: country.flags[1], //esto trae el png
            continents: country.continents[0],
            capital: Array.isArray(country.capital)?country.capital[0]:country.capital, 
            subregion: country.subregion,
            area: country.area,
            population: country.population,
        }
    })
}

const getAllCountries = async () => {
    //acá iría la bdd si existe para countries

    const apiCountriesRaw = (
        await axios.get("https://restcountries.com/v3/all")
    ).data;

    const apiCountries = colador(apiCountriesRaw)

    return apiCountries;  //acá no era iterable porque colador no estaba retornando nada
}

const getCountryById = async (idPais) => {

    const countryByIdRaw = (
        await axios.get(`https://restcountries.com/v3/alpha/${idPais}`)
    ).data;
    const countryById = colador(countryByIdRaw);
    return countryById[0];
}

const searchByName = async (name) =>{
    const countryByNameRaw = (
        await axios.get(`https://restcountries.com/v3/name/${name}`)
    ).data;
    const countryByName = colador(countryByNameRaw);
    return countryByName[0];
}


module.exports = { getAllCountries, getCountryById, searchByName }