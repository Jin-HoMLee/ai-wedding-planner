const mongoose = require('mongoose');

const guestSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, trim: true, match: /.+\@.+\..+/ },
  phone: { type: String, trim: true },
  rsvp: { type: Boolean, default: false },
  notes: { type: String, maxlength: 200 }
});

const Guest = mongoose.model('Guest', guestSchema);

module.exports = Guest;