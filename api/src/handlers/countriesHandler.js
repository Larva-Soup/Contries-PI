const {
  getAllCountries,
  getCountryById,
  searchByName,
} = require("../controllers/countriesController");

const getCountriesHandler = async (req, res) => {
  try {
    const { name } = req.query;

    const results = name ? await searchByName(name) : await getAllCountries();

    res.status(200).send(results);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const getCountryHandler = async (req, res) => {
try {
    const { idPais } = req.params;

  const results = await getCountryById(idPais.toUpperCase());

  res.status(200).send(results);
} catch (error) {
    res.status(400).send({error: error.message})
}
  
};

module.exports = { getCountriesHandler, getCountryHandler };
