const express = require('express');

const routs = express.Router();

const SliderController = require('../controllers/SliderController');

const SliderModel = require('../models/SliderModel');

routs.get('/add_slider', SliderController.add_slider);

routs.get("/view_slider", SliderController.view_slider);

routs.post("/insertSliderData", SliderModel.sliderUploads, SliderController.insertSliderData);

routs.get("/deactive/:id", SliderController.deactive);
routs.get("/active/:id", SliderController.active);

module.exports = routs;