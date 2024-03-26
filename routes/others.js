const express = require('express');

const routs = express.Router();

const OthersController = require('../controllers/OthersController');

routs.get("/add_others", OthersController.add_others);

routs.post("/insertOtherData", OthersController.insertOtherData);

routs.get("/view_others", OthersController.view_others);
module.exports = routs;