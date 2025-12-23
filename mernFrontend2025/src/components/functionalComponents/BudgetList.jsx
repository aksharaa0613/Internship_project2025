import { Link } from 'react-router-dom';
import { useBudget } from './Hooks/useBudget';
import { useExpense } from './Hooks/useExpense';

const BudgetList = () => {
  const { budgets, loading, deleteBudget } = useBudget();
  const { expenses } = useExpense();

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this budget?')) {
      await deleteBudget(id);
    }
  };

  const getBudgetExpenses = (budgetId) => {
    return expenses.filter(expense => expense.budget === budgetId);
  };

  const getTotalExpenses = (budgetId) => {
    return getBudgetExpenses(budgetId).reduce((sum, expense) => sum + expense.amount, 0);
  };

  if (loading) {
    return <div className="loading">Loading budgets...</div>;
  }

  return (
    <div className="budget-list">
      <div className="page-header">
        <h1>Your Budgets</h1>
        <Link to="/add-budget" className="btn btn-primary">Create New Budget</Link>
      </div>

      {budgets.length === 0 ? (
        <div className="empty-state">
          <h3>No budgets created yet</h3>
          <p>Create your first budget to start tracking your expenses</p>
          <Link to="/add-budget" className="btn btn-primary">Create Budget</Link>
        </div>
      ) : (
        <div className="budget-grid">
          {budgets.map(budget => {
            const totalExpenses = getTotalExpenses(budget._id);
            const remaining = budget.totalBudget - totalExpenses;
            const percentUsed = (totalExpenses / budget.totalBudget) * 100;

            return (
              <div key={budget._id} className="budget-card">
                <div className="budget-header">
                  <h3>{budget.month} {budget.year}</h3>
                  <div className="budget-actions">
                    <button
                      onClick={() => handleDelete(budget._id)}
                      className="btn btn-danger btn-small"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                <div className="budget-stats">
                  <div className="stat">
                    <label>Total Budget:</label>
                    <span>₹{budget.totalBudget}</span>
                  </div>
                  <div className="stat">
                    <label>Spent:</label>
                    <span>₹{totalExpenses}</span>
                  </div>
                  <div className="stat">
                    <label>Remaining:</label>
                    <span className={remaining < 0 ? 'negative' : 'positive'}>
                      ₹{remaining}
                    </span>
                  </div>
                </div>

                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ 
                      width: `${Math.min(percentUsed, 100)}%`,
                      backgroundColor: percentUsed > 100 ? '#e74c3c' : '#3498db'
                    }}
                  />
                </div>
                <p className="progress-text">{percentUsed.toFixed(1)}% used</p>

                {budget.categories && budget.categories.length > 0 && (
                  <div className="categories">
                    <h4>Categories:</h4>
                    <div className="category-list">
                      {budget.categories.map((category, index) => (
                        <div key={index} className="category-item">
                          <span>{category.name}</span>
                          <span>₹{category.amount}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default BudgetList;