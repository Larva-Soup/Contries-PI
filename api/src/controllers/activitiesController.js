const { Country, TuristActivity } = require("../db");
// const axios = require("axios");

const createActivity = async ({
  name,
  difficulty,
  duration,
  season,
  countryArray,
}) => {
  // const countries= await countryArray.map(async(name) => {return await Country.findAll({
  //   where: {
  //     name: name
  //   }
  // })})

  const newActivity = await TuristActivity.create({
    name,
    difficulty,
    duration,
    season,
  });
  //acá se asocian las actividades y los paises
  await newActivity.addCountries([...countryArray]) || await newActivity.addCountry(countryArray[0]);
  return newActivity;
};

module.exports = { createActivity };
