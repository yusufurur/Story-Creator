const express = require('express');
const router = express.router;

router.get('/:id', (req, res) => {
  getStoryContribution(req.params.id)
    .then((contribution) => {
      res.json({ contributions })
    })
    .catch((err) => console.log("error for getStoryContributions", err));
})
