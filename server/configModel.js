const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ConfigSchema = new Schema({
  sendEmails: Boolean,
  adminEmailAddress: String
});

module.exports = mongoose.model('Config', ConfigSchema);
