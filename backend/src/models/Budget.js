const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  notes: { type: String }
});

const Budget = mongoose.model('Budget', budgetSchema);

module.exports = Budget;