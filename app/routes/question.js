var QuestionRoute = function(router, Question) {

  router.route('/questions')
    .get(function(req, res) {

      Question.find(function(err, questions) {
        if (err) {
          res.send(err);
        }

        res.json(questions);
      })

    })

    .post(function(req, res) {
      var question = new Question();

      question.description = req.body.description;

      question.save(function(err) {
        if (err)
          res.send(err);

        res.json({ message: 'question created!' });
      });
    });

  router.route('/questions/:question_id')
    .get(function(req, res) {
      Question.findById(req.params.question_id, function(err, question) {
        if (err) {
          res.send(err);
        }

        res.json(question);
      });
    });

};

module.exports = QuestionRoute;