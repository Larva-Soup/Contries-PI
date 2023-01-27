const {createActivity, getActivities} = require('../controllers/activitiesController')

const createActivityHandler = async(req, res) =>{
    // const{name, difficulty, duration, season} = req.body
    // const activity = req.body
    try {
        const results = await createActivity(req.body);

        res.status(201).send("actividad creada con éxico")
    } catch (error) {
        res.status(400).send({error: error.message})
    }
    
}

const getActivitiesHandler = async(req, res) =>{
    try {
        const results = await getActivities()
        res.status(200).send(results)
    } catch (error) {
        res.status(400).send({error: error.message})
    }

}

module.exports = {createActivityHandler, getActivitiesHandler}