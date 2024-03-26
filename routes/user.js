const express = require('express');

const routs = express.Router();

const UserController = require('../controllers/UserController');
const CommentModel = require('../models/CommentModel');

routs.get("/",UserController.home);

routs.get('/blogsingle/:id', UserController.blogsingle);

routs.post("/addPostComment", CommentModel.uploadImage,UserController.addPostComment);

routs.get("/work-three-columns", UserController.workThreeColumns)

module.exports = routs;