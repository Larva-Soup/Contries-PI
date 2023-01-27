const {Router} = require('express');
const {createActivityHandler, getActivitiesHandler} = require('../handlers/activitiesHandler')

const activitiesRouter = Router();

activitiesRouter.post("/", createActivityHandler);

activitiesRouter.get("/", getActivitiesHandler);


module.exports = activitiesRouter;