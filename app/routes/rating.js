var Question = require('../models/question');
var Answer   = require('../models/answer');

var RatingRoute = function(router, Rating) {

  router.route('/rating/question/:question_id')
    .post(function(req, res) {
      Question.findOneAndUpdate({_id: req.body.question_id}, {rating: req.body.rating}, function(err, question) {
        if (err)
          res.send(err);

        res.json(answer);
      })
    })

    .get(function(req, res) {
      
    });

  router.route('/rating/answer/:answer_id')
    .post(function(req, res) {
      Answer.findOneAndUpdate({_id: req.body.answer_id}, {rating: req.body.rating}, function(err, answer) {
        if (err)
          res.send(err);

        res.json(answer);
      })
    })

    .get(function(req, res) {

    });

};

module.exports = RatingRoute;