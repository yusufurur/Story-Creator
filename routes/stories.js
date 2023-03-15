const express = require('express');
const router = express.Router();

router.get('/', (res, req) => {
  browseSelectStories(req.session.userId)
    .then((stories) => {
      const templateVars = {
        stories: stories,
        users: req.session.userId
      }
      res.render('homepage', templateVars)
    })
    .catch((error) => console.log("Error for BrowseStory", error));
})
