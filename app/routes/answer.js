var AnswerRoute = function(router, Answer) {

  router.route('/answers')
    .post(function(req, res) {
      console.log('got it ');
      var answer = new Answer();
      answer.description = req.body.description;
      answer._question = req.body.question_id;
      answer.userLocalStorage = req.body.user_id;

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


};

module.exports = AnswerRoute;