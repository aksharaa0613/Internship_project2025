import { Link } from 'react-router-dom';
import { useAuth } from './Hooks/useAuth';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="home">
      <div className="hero">
        <h1>Welcome to Budget Planner</h1>
        <p>Take control of your finances with our easy-to-use budget planning tool</p>
        {user ? (
          <div className="hero-actions">
            <Link to="/dashboard" className="btn btn-primary">Go to Dashboard</Link>
            <Link to="/add-budget" className="btn btn-secondary">Create Budget</Link>
          </div>
        ) : (
          <div className="hero-actions">
            <Link to="/signup" className="btn btn-primary">Get Started</Link>
            <Link to="/login" className="btn btn-secondary">Login</Link>
          </div>
        )}
      </div>
      
      <div className="features">
        <h2>Features</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <h3>Budget Management</h3>
            <p>Create and manage monthly budgets with ease</p>
          </div>
          <div className="feature-card">
            <h3>Expense Tracking</h3>
            <p>Track your expenses and categorize them</p>
          </div>
          <div className="feature-card">
            <h3>Financial Insights</h3>
            <p>Get insights into your spending patterns</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;