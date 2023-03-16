const express = require('express');
const router = express.Router();
const {getUsers, getUserById} = require('../db/helperquery/users-queries');
const {browseStory, getStoryById, addStory} = require('../db/helperquery/story-query');

// Post route for the login Page
router.post('/', (req, res) => {
  req.session.password =req.body.password;
  req.session.userid = req.body.userid;
  res.redirect('/stories')
})

// Get route for the login page
router.get('/', (req, res) => {
  res.render('login')
});

module.exports = router;
