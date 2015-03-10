var AnswerRoute = function(router, Answer) {

  router.route('/answers')
    .post(function(req, res) {
      console.log('got it ');
      var answer = new Answer();
      answer.description = req.body.description;
      answer._question = '54fdf25c96fc29c14b000002';

      answer.save(function(err) {
        if (err) {
          res.send(err);
        }

        res.json({message : 'answered !'});
      })
    })
    .get(function(req, res) {
      Answer.find(function(err, answers) {
        if (err) {
          res.send(err);
        }

        res.json(answers);
      })
    })

  router.route('/answers/fromquestion/:question_id')
    .get(function(req, res) {
      Answer.find({_question: req.params.question_id}, function(err, answers) {
        if (err) {
          res.send(err);
        }

        res.json(answers);
      });
    })

  router.route('/answers/:answer_id')
    .get(function(req, res) {
      console.log(req.params);
      Answer.findById(req.params.answer_id)
        .populate('_question')
        .exec(function(err, answer) {
          if (err) {
            res.send(err);
          }

          console.log(answer);

          res.json(answer);
        });
    });

  router.route('/answers/rate/answer_id')
    .post(function(req, res) {
      Answer.findOneAndUpdate({_id: req.body.answer_id}, {rating: req.body.rating}, function(err, answer) {
        if (err)
          res.send(err);

        res.json(answer);
      })
    })
    .get(function(req, res) {
      Answer.findOne({_id: req.params.answer_id}, function(err, answer) {
        if (err)
          res.send(err);

        res.json(answer);
      })
    })


};

module.exports = AnswerRoute;