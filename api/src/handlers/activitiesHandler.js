const {createActivity} = require('../controllers/activitiesController')

const createActivityHandler = async(req, res) =>{
    // const{name, difficulty, duration, season} = req.body
    // const activity = req.body
    try {
        const results = await createActivity(req.body);
        res.status(201).send("Actividad creada con exito")
    } catch (error) {
        res.status(400).send({error: error.message})
    }
    
}

module.exports = {createActivityHandler}