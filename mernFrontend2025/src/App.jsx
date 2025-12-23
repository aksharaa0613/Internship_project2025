import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './components/functionalComponents/Hooks/useAuth';
import Navbar from './components/functionalComponents/Navbar';
import Home from './components/functionalComponents/Home';
import Login from './components/functionalComponents/Login';
import Signup from './components/functionalComponents/Signup';
import Dashboard from './components/functionalComponents/Dashboard';
import AddBudget from './components/functionalComponents/AddBudget';
import AddExpense from './components/functionalComponents/AddExpense';
import BudgetList from './components/functionalComponents/BudgetList';
import Stats from './components/functionalComponents/Stats';
import About from './components/functionalComponents/About';
import './css/style.css';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/about" element={<About />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/add-budget" element={
              <ProtectedRoute>
                <AddBudget />
              </ProtectedRoute>
            } />
            <Route path="/add-expense" element={
              <ProtectedRoute>
                <AddExpense />
              </ProtectedRoute>
            } />
            <Route path="/budgets" element={
              <ProtectedRoute>
                <BudgetList />
              </ProtectedRoute>
            } />
            <Route path="/stats" element={
              <ProtectedRoute>
                <Stats />
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;