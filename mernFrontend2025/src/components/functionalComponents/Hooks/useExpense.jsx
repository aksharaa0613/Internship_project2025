import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'https://your-render-backend-url.onrender.com/api';

export const useExpense = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchExpenses = async (budgetId = null) => {
    setLoading(true);
    try {
      const url = budgetId ? `${API_URL}/expenses?budgetId=${budgetId}` : `${API_URL}/expenses`;
      const response = await axios.get(url);
      setExpenses(response.data.expenses);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch expenses');
    } finally {
      setLoading(false);
    }
  };

  const createExpense = async (expenseData) => {
    try {
      const response = await axios.post(`${API_URL}/expenses`, expenseData);
      setExpenses(prev => [response.data.expense, ...prev]);
      return { success: true };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || 'Failed to create expense' };
    }
  };

  const updateExpense = async (id, expenseData) => {
    try {
      const response = await axios.put(`${API_URL}/expenses/${id}`, expenseData);
      setExpenses(prev => prev.map(expense => 
        expense._id === id ? response.data.expense : expense
      ));
      return { success: true };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || 'Failed to update expense' };
    }
  };

  const deleteExpense = async (id) => {
    try {
      await axios.delete(`${API_URL}/expenses/${id}`);
      setExpenses(prev => prev.filter(expense => expense._id !== id));
      return { success: true };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || 'Failed to delete expense' };
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return {
    expenses,
    loading,
    error,
    createExpense,
    updateExpense,
    deleteExpense,
    refetch: fetchExpenses
  };
};