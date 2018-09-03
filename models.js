const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Rsvps
let RsvpSchema = new Schema({
  position: Number,
  name: String,
  timestamp: String
},{
    collection: 'rsvps'
});

module.exports = mongoose.model('Rsvp', RsvpSchema);
