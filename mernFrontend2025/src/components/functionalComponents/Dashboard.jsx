import { Link } from 'react-router-dom';
import { useBudget } from './Hooks/useBudget';
import { useExpense } from './Hooks/useExpense';
import { useAuth } from './Hooks/useAuth';

const Dashboard = () => {
  const { user } = useAuth();
  const { budgets, loading: budgetLoading } = useBudget();
  const { expenses, loading: expenseLoading } = useExpense();

  const currentMonth = new Date().toLocaleString('default', { month: 'long' });
  const currentYear = new Date().getFullYear();
  
  const currentBudget = budgets.find(budget => 
    budget.month === currentMonth && budget.year === currentYear
  );

  const currentMonthExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    return expenseDate.getMonth() === new Date().getMonth() && 
           expenseDate.getFullYear() === currentYear;
  });

  const totalExpenses = currentMonthExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const remainingBudget = currentBudget ? currentBudget.totalBudget - totalExpenses : 0;

  if (budgetLoading || expenseLoading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Welcome back, {user.name}!</h1>
        <p>Here's your financial overview for {currentMonth} {currentYear}</p>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Current Budget</h3>
          <p className="stat-value">${currentBudget ? currentBudget.totalBudget : 0}</p>
        </div>
        <div className="stat-card">
          <h3>Total Expenses</h3>
          <p className="stat-value">${totalExpenses}</p>
        </div>
        <div className="stat-card">
          <h3>Remaining</h3>
          <p className={`stat-value ${remainingBudget < 0 ? 'negative' : 'positive'}`}>
            ${remainingBudget}
          </p>
        </div>
        <div className="stat-card">
          <h3>Total Budgets</h3>
          <p className="stat-value">{budgets.length}</p>
        </div>
      </div>

      <div className="dashboard-actions">
        <Link to="/add-budget" className="btn btn-primary">Create Budget</Link>
        <Link to="/add-expense" className="btn btn-secondary">Add Expense</Link>
        <Link to="/budgets" className="btn btn-outline">View All Budgets</Link>
        <Link to="/stats" className="btn btn-outline">View Statistics</Link>
      </div>

      <div className="recent-activity">
        <h2>Recent Expenses</h2>
        {currentMonthExpenses.length > 0 ? (
          <div className="expense-list">
            {currentMonthExpenses.slice(0, 5).map(expense => (
              <div key={expense._id} className="expense-item">
                <div className="expense-info">
                  <h4>{expense.title}</h4>
                  <p>{expense.category}</p>
                </div>
                <div className="expense-amount">${expense.amount}</div>
              </div>
            ))}
          </div>
        ) : (
          <p>No expenses recorded for this month.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;