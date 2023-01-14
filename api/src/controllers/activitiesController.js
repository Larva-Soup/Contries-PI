const {Country, TuristActivity} = require('../db');
const axios = require('axios');

const createActivity = async ({name, difficulty, duration, season}) =>{
    return await TuristActivity.create({name, difficulty, duration, season })
}

module.exports = {createActivity}