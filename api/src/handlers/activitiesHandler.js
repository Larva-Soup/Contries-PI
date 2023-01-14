const {createActivity} = require('../controllers/activitiesController')

const createActivityHandler = async(req, res) =>{
    // const{name, difficulty, duration, season} = req.body
    // const activity = req.body
    const results = await createActivity(req.body);
    res.status(201).send(results)
}

module.exports = {createActivityHandler}