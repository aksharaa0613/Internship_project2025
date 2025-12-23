import { useBudget } from './Hooks/useBudget';
import { useExpense } from './Hooks/useExpense';

const Stats = () => {
  const { budgets } = useBudget();
  const { expenses } = useExpense();

  const totalBudgets = budgets.length;
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const totalBudgetAmount = budgets.reduce((sum, budget) => sum + budget.totalBudget, 0);
  const averageExpense = expenses.length > 0 ? totalExpenses / expenses.length : 0;

  // Category breakdown
  const categoryStats = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});

  // Monthly breakdown
  const monthlyStats = expenses.reduce((acc, expense) => {
    const date = new Date(expense.date);
    const monthYear = `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
    acc[monthYear] = (acc[monthYear] || 0) + expense.amount;
    return acc;
  }, {});

  const topCategories = Object.entries(categoryStats)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5);

  const recentMonths = Object.entries(monthlyStats)
    .sort(([a], [b]) => new Date(b) - new Date(a))
    .slice(0, 6);

  return (
    <div className="stats">
      <div className="page-header">
        <h1>Financial Statistics</h1>
      </div>

      <div className="stats-overview">
        <div className="stat-card">
          <h3>Total Budgets</h3>
          <p className="stat-value">{totalBudgets}</p>
        </div>
        <div className="stat-card">
          <h3>Total Expenses</h3>
          <p className="stat-value">₹{totalExpenses.toFixed(2)}</p>
        </div>
        <div className="stat-card">
          <h3>Total Budget Amount</h3>
          <p className="stat-value">₹{totalBudgetAmount.toFixed(2)}</p>
        </div>
        <div className="stat-card">
          <h3>Average Expense</h3>
          <p className="stat-value">₹{averageExpense.toFixed(2)}</p>
        </div>
      </div>

      <div className="stats-details">
        <div className="stats-section">
          <h2>Top Spending Categories</h2>
          {topCategories.length > 0 ? (
            <div className="category-stats">
              {topCategories.map(([category, amount]) => (
                <div key={category} className="category-stat">
                  <div className="category-info">
                    <span className="category-name">{category}</span>
                    <span className="category-amount">₹{amount.toFixed(2)}</span>
                  </div>
                  <div className="category-bar">
                    <div 
                      className="category-fill"
                      style={{ 
                        width: `${(amount / topCategories[0][1]) * 100}%` 
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No expense data available</p>
          )}
        </div>

        <div className="stats-section">
          <h2>Monthly Spending</h2>
          {recentMonths.length > 0 ? (
            <div className="monthly-stats">
              {recentMonths.map(([month, amount]) => (
                <div key={month} className="monthly-stat">
                  <div className="month-info">
                    <span className="month-name">{month}</span>
                    <span className="month-amount">₹{amount.toFixed(2)}</span>
                  </div>
                  <div className="month-bar">
                    <div 
                      className="month-fill"
                      style={{ 
                        width: `${(amount / Math.max(...recentMonths.map(([,amt]) => amt))) * 100}%` 
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No monthly data available</p>
          )}
        </div>
      </div>

      <div className="stats-insights">
        <h2>Insights</h2>
        <div className="insights-grid">
          <div className="insight-card">
            <h4>Budget Utilization</h4>
            <p>
              {totalBudgetAmount > 0 
                ? `You've spent ${((totalExpenses / totalBudgetAmount) * 100).toFixed(1)}% of your total budget`
                : 'Create a budget to track utilization'
              }
            </p>
          </div>
          <div className="insight-card">
            <h4>Spending Trend</h4>
            <p>
              {expenses.length > 0 
                ? `You have ${expenses.length} recorded expenses`
                : 'Start adding expenses to see trends'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;