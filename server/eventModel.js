const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let EventSchema = new Schema({
  date: Date,
},{
    collection: 'events'
});

module.exports = mongoose.model('Event', EventSchema);
