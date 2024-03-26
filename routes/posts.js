const express = require('express');

const routs = express.Router();

const PostModel = require('../models/PostModel');

const postController = require('../controllers/PostController');

routs.get("/add_post", postController.add_post);

routs.post("/insertPostData",PostModel.postUploads, postController.insertPostData);

module.exports = routs;