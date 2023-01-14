const { Router } = require("express");
const {
  getCountriesHandler, getCountryHandler
} = require("../handlers/countriesHandler");

const countriesRouter = Router();

countriesRouter.get("/", getCountriesHandler);

countriesRouter.get("/:idPais", getCountryHandler);

module.exports = countriesRouter;
