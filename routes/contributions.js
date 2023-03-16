const express = require('express');
const router = express.router;

router.get('/:id', (req, res) => {
  getStoryContribution(req.params.id)
    .then((contribution) => {
      res.json({ contributions })
    })
    .catch((err) => console.log("error for getStoryContributions", err));
});

router.post('/:id/upVotes', (req, res) => {
  const userId = req.session.userId;
  addUpVotes(req.params.id, userId)
    .then(() => {
      return getUpVotes(req.params.id);
    })
    .then(({rows}) => {
      res.json({...rows[0]})
    })
    .catch(err =>
      console.log("Error with upvoting", err))
      res.status(500).json({ error: "Failed to add upvote" });
})
    module.exports = router;

