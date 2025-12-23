import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBudget } from './Hooks/useBudget';

const AddBudget = () => {
  const [formData, setFormData] = useState({
    month: new Date().toLocaleString('default', { month: 'long' }),
    year: new Date().getFullYear(),
    totalBudget: '',
    categories: [{ name: 'Food', amount: '' }]
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { createBudget } = useBudget();
  const navigate = useNavigate();

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCategoryChange = (index, field, value) => {
    const updatedCategories = [...formData.categories];
    updatedCategories[index][field] = value;
    setFormData({ ...formData, categories: updatedCategories });
  };

  const addCategory = () => {
    setFormData({
      ...formData,
      categories: [...formData.categories, { name: '', amount: '' }]
    });
  };

  const removeCategory = (index) => {
    const updatedCategories = formData.categories.filter((_, i) => i !== index);
    setFormData({ ...formData, categories: updatedCategories });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const budgetData = {
      ...formData,
      totalBudget: parseFloat(formData.totalBudget),
      categories: formData.categories.map(cat => ({
        name: cat.name,
        amount: parseFloat(cat.amount) || 0
      }))
    };

    const result = await createBudget(budgetData);
    
    if (result.success) {
      navigate('/budgets');
    } else {
      setError(result.message);
    }
    
    setLoading(false);
  };

  return (
    <div className="form-container">
      <div className="form-wrapper">
        <h2>Create New Budget</h2>
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Month:</label>
              <select name="month" value={formData.month} onChange={handleChange} required>
                {months.map(month => (
                  <option key={month} value={month}>{month}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Year:</label>
              <input
                type="number"
                name="year"
                value={formData.year}
                onChange={handleChange}
                min="2020"
                max="2030"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Total Budget:</label>
            <input
              type="number"
              name="totalBudget"
              value={formData.totalBudget}
              onChange={handleChange}
              min="0"
              step="0.01"
              required
            />
          </div>

          <div className="categories-section">
            <h3>Budget Categories</h3>
            {formData.categories.map((category, index) => (
              <div key={index} className="category-row">
                <input
                  type="text"
                  placeholder="Category name"
                  value={category.name}
                  onChange={(e) => handleCategoryChange(index, 'name', e.target.value)}
                  required
                />
                <input
                  type="number"
                  placeholder="Amount"
                  value={category.amount}
                  onChange={(e) => handleCategoryChange(index, 'amount', e.target.value)}
                  min="0"
                  step="0.01"
                />
                {formData.categories.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeCategory(index)}
                    className="btn btn-danger btn-small"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button type="button" onClick={addCategory} className="btn btn-outline">
              Add Category
            </button>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Creating...' : 'Create Budget'}
            </button>
            <button type="button" onClick={() => navigate('/budgets')} className="btn btn-secondary">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBudget;