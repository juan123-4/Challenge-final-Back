const express = require('express')
const router = express.Router()
const Task = require('../models/player.js')
const PlayerController = require('../controllers/playerController.js')

router.post("/create", PlayerController.create)
router.get('/', PlayerController.getAll )
router.get('/ssr', PlayerController.getAllSSR )
router.get('/id/:_id', PlayerController.getByID)
router.put('/id/:_id', PlayerController.updateByName) 
router.delete('/id/:_id', PlayerController.deleteTask )
router.get('/player/:name', PlayerController.getByName);
router.get('/player/country/:country', PlayerController.getByCountry);
router.get('/player/team/:team', PlayerController.getByTeam);




module.exports = router