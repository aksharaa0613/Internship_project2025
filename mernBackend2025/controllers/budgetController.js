const Budget = require('../models/Budget');

exports.createBudget = async (req, res) => {
  try {
    const { month, year, totalBudget, categories } = req.body;
    
    const budget = await Budget.create({
      user: req.user._id,
      month,
      year,
      totalBudget,
      categories
    });

    res.status(201).json({ success: true, budget });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Budget for this month already exists' });
    }
    res.status(500).json({ message: error.message });
  }
};

exports.getBudgets = async (req, res) => {
  try {
    const budgets = await Budget.find({ user: req.user._id }).sort({ year: -1, month: -1 });
    res.json({ success: true, budgets });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getBudget = async (req, res) => {
  try {
    const budget = await Budget.findOne({ 
      _id: req.params.id, 
      user: req.user._id 
    });
    
    if (!budget) {
      return res.status(404).json({ message: 'Budget not found' });
    }

    res.json({ success: true, budget });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateBudget = async (req, res) => {
  try {
    const budget = await Budget.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );

    if (!budget) {
      return res.status(404).json({ message: 'Budget not found' });
    }

    res.json({ success: true, budget });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteBudget = async (req, res) => {
  try {
    const budget = await Budget.findOneAndDelete({ 
      _id: req.params.id, 
      user: req.user._id 
    });

    if (!budget) {
      return res.status(404).json({ message: 'Budget not found' });
    }

    res.json({ success: true, message: 'Budget deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};