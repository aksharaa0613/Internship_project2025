import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'https://your-render-backend-url.onrender.com/api';

export const useBudget = () => {
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBudgets = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/budgets`);
      setBudgets(response.data.budgets);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch budgets');
    } finally {
      setLoading(false);
    }
  };

  const createBudget = async (budgetData) => {
    try {
      const response = await axios.post(`${API_URL}/budgets`, budgetData);
      setBudgets(prev => [response.data.budget, ...prev]);
      return { success: true };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || 'Failed to create budget' };
    }
  };

  const updateBudget = async (id, budgetData) => {
    try {
      const response = await axios.put(`${API_URL}/budgets/${id}`, budgetData);
      setBudgets(prev => prev.map(budget => 
        budget._id === id ? response.data.budget : budget
      ));
      return { success: true };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || 'Failed to update budget' };
    }
  };

  const deleteBudget = async (id) => {
    try {
      await axios.delete(`${API_URL}/budgets/${id}`);
      setBudgets(prev => prev.filter(budget => budget._id !== id));
      return { success: true };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || 'Failed to delete budget' };
    }
  };

  useEffect(() => {
    fetchBudgets();
  }, []);

  return {
    budgets,
    loading,
    error,
    createBudget,
    updateBudget,
    deleteBudget,
    refetch: fetchBudgets
  };
};