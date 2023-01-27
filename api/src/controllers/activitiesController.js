const { Country, TuristActivity } = require("../db");
// const axios = require("axios");

const createActivity = async ({
  name,
  difficulty,
  duration,
  season,
  countryArray,
}) => {
  const newActivity = await TuristActivity.create({
    name,
    difficulty,
    duration,
    season,
  });
  //acá se asocian las actividades y los paises
  (await newActivity.addCountries([...countryArray])) ||
    (await newActivity.addCountry(countryArray[0]));
  return newActivity;
};

const getActivities = async () => {
  return await TuristActivity.findAll({
    include: {
      model: Country,
      attributes: ["id", "name", "flags", "continents", "population"],
    },
  });
};

module.exports = { createActivity, getActivities };
