const mongoose = require('mongoose');
const { EMAIL_REGEX } = require('../utils/validation');

const guestSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, trim: true, match: EMAIL_REGEX },
  phone: { type: String, trim: true },
  rsvp: { type: Boolean, default: false },
  notes: { type: String, maxlength: 200 }
});

const Guest = mongoose.model('Guest', guestSchema);

module.exports = Guest;