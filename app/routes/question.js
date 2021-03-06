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
      question.userLocalStorage = req.body.user_id;

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

  router.route('/questions/user/:user_id')
    .get(function(req, res) {
      Question.find({userLocalStorage: req.params.user_id}, function(err, questions) {
        if (err) {
          res.send(err);
        }

        res.json(questions);
      });
    });

  router.route('/randomquestion')
    .get(function(req, res) {

      Question
        .find()
        .where('random')
        .near([Math.random(), Math.random()])
        .limit(1)
        // .near(0.9537844825536013, 0.8665213629137725 )
        .exec(function(err, result){

            if (err) res.send(err);

            res.json(result);
        });
    });

  router.route('/rated/questions')
    .get(function(req, res) {
      Question.find().sort({rating: -1}).exec(function (err, questions) {
        if (err)
          res.send(err);

        res.json(questions);
      });
    });

  router.route('/questions/rate/question_id')
    .post(function(req, res) {
      Question.findOneAndUpdate({_id: req.body.question_id}, {rating: req.body.rating}, function(err, question) {
        if (err)
          res.send(err);

        res.json(question);
      })
    })
    .get(function(req, res) {
      Question.findOne({_id: req.params.question_id}, function(err, question) {
        if (err)
          res.send(err);

        res.json(question);
      })
    });

};

module.exports = QuestionRoute;