var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var AnswerSchema   = new Schema({
  _question : { type: Schema.Types.ObjectId, ref: 'Question' },
  description: String,
  rating: Number,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  createdBy: String,
  updatedBy: String,
  random: {type: [Number], default: function(){ return [Math.random(), Math.random()]}, index: '2d'},
  userLocalStorage: String
});

module.exports = mongoose.model('Answer', AnswerSchema);