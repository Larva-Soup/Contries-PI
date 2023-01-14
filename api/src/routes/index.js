const { Router } = require('express');
const countriesRouter = require('./countriesRouter');
const activitiesRouter = require('./activitiesRouter')


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//countries
router.use('/countries', countriesRouter)

//activities
router.use('/activities', activitiesRouter)

module.exports = router;
