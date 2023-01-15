const {getAllCountries, getCountryById, searchByName} = require('../controllers/countriesController')

const getCountriesHandler = async (req, res) =>{
    const {name} = req.query;

    const results = name? await searchByName(name): await getAllCountries();

    res.status(200).send(results)
}

const getCountryHandler = async (req, res) =>{
    const{idPais} = req.params;

    const results = await getCountryById(idPais.toUpperCase());

    res.status(200).send(results)

}

module.exports = {getCountriesHandler, getCountryHandler}
