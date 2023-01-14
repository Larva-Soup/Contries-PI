const {Router} = require('express');
const {createActivityHandler} = require('../handlers/activitiesHandler')

const activitiesRouter = Router();

activitiesRouter.post("/", createActivityHandler)


module.exports = activitiesRouter;