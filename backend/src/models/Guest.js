const mongoose = require('mongoose');

const guestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String },
  phone: { type: String },
  rsvp: { type: Boolean, default: false },
  notes: { type: String }
});

const Guest = mongoose.model('Guest', guestSchema);

module.exports = Guest;