const express = require('express');

const routs = express.Router();
const SubcatModel = require('../models/SubcategoryModel');

const subController = require('../controllers/SubcategoryController');

routs.get('/add_subcategory',subController.add_subcategory);

routs.post("/insertSubcategoryData",SubcatModel.subcategoryUploads, subController.insertSubcategoryData);

routs.get("/view_subcategory", subController.view_subcategory);
module.exports = routs;