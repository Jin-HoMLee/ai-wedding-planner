const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
  category: { type: String, required: true, trim: true },
  amount: { type: Number, required: true, min: 0 },
  notes: { type: String, maxlength: 200 }
});

const Budget = mongoose.model('Budget', budgetSchema);

module.exports = Budget;