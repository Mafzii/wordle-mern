const router = require('express').Router();
let History = require('../models/history.model');

router.route('/').get((req, res) => {
  History.find()
    .then(history => res.json(history))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const playspace = req.body.playspace;
  const words = req.body.words;
  const won = req.body.won;
  const word = req.body.word;

  const newHist = new History({username,playspace,words,won,word});

  newHist.save()
    .then(() => res.json('History entry created!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;