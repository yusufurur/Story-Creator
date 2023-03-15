const { response } = require('express');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
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

router.get('/me', (req, res) => {
  getUserStoriesByUserId(req.session.userId)
  .then((stories) => {
    const  templateVars = {
      stories: stories,
      user: req.session.userId,
    }
    res.render('homepage', templateVars)
  })
  .catch((err) => console.log("Error for getUserStoriesByUserId", error));
})

router.get('/:id', (req, res) => {
  let templateVars = {
    user: req.session.userId
  };
  Story.findById(req.params.id)
    .then((story) => {
      templateVars.story = story;
    })
    .then(() => {
      getStoryContributions(req.params.id)
        .then((contributions) => {
          templateVars.contributions = contributions;
          res.render('readstory', templateVars)
        })
        .catch((err) => console.log("Error for getStoriesContributions", err));
    })
    .catch((err) => console.log("Error for Story.findById", err));
});

router.post('/:id', (req, res) => {
  addContribution({ story_id: req.params.id, name_id: req.session.userid, ...req.body })
    .then((response) => {
      res.redirect('/stories/$(req.params.id')
    })
});

router.post('/', (req, res) => {
  const { name_id } = req.body;
  addStory({ ...req.body, name_id: name_id, userId: req.session.userId })
    .then(() => {
      res.redirect('/stories/me');
    })
    .catch((err) => console.log("Error for addStory", err));
});

router.put('/:id', (req, res) => {
  countContributions(req.params.id)
    .then(({ rows }) => {
      updateAcceptedAtTrue(rows.length + 1, req.body.contributionsId)
        .then((response) => {
          return getCompletedStory(req.params.id);
        })
        .catch((err) => console.log("Error for updateAcceptedAtTrue", err));
    })
    .catch((err) => console.log("Error for countContributions", err));
});


