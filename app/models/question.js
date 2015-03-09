var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var QuestionSchema   = new Schema({
  description: String,
  rating: Number,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  createdBy: String,
  updatedBy: String,
  answers:  [ { type: Schema.Types.ObjectId, ref: 'Answer' }]
});

module.exports = mongoose.model('Question', QuestionSchema);