var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var QuestionSchema   = new Schema({
  description: String,
  rating: Number,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  createdBy: String,
  updatedBy: String,
  answers:  [ { type: Schema.Types.ObjectId, ref: 'Answer' }],
  random: {type: [Number], default: function(){ return [Math.random(), Math.random()]}, index: '2d'},
  userLocalStorage: String
});

module.exports = mongoose.model('Question', QuestionSchema);