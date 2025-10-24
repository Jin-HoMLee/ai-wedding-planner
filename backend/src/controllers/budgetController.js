const Budget = require('../models/Budget');

/**
 * GET /api/budgets
 */
exports.getAllBudgets = async (req, res) => {
  try {
    const budgets = await Budget.find().lean();
    return res.status(200).json(budgets);
  } catch (err) {
    console.error('getAllBudgets error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

/**
 * GET /api/budgets/:id
 */
exports.getBudgetById = async (req, res) => {
  try {
    const budget = await Budget.findById(req.params.id).lean();
    if (!budget) return res.status(404).json({ message: 'Budget not found' });
    return res.status(200).json(budget);
  } catch (err) {
    console.error('getBudgetById error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

/**
 * POST /api/budgets
 */
exports.createBudget = async (req, res) => {
  try {
    const budget = new Budget(req.body);
    await budget.save();
    return res.status(201).json(budget);
  } catch (err) {
    console.error('createBudget error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

/**
 * PUT /api/budgets/:id
 */
exports.updateBudget = async (req, res) => {
  try {
    const budget = await Budget.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).lean();
    if (!budget) return res.status(404).json({ message: 'Budget not found' });
    return res.status(200).json(budget);
  } catch (err) {
    console.error('updateBudget error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

/**
 * DELETE /api/budgets/:id
 */
exports.deleteBudget = async (req, res) => {
  try {
    const budget = await Budget.findByIdAndDelete(req.params.id).lean();
    if (!budget) return res.status(404).json({ message: 'Budget not found' });
    return res.status(200).json({ message: 'Budget deleted' });
  } catch (err) {
    console.error('deleteBudget error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};