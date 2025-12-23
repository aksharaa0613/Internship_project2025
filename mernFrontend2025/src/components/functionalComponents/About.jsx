const About = () => {
  return (
    <div className="about">
      <div className="about-content">
        <h1>About Budget Planner</h1>
        
        <section className="about-section">
          <h2>Our Mission</h2>
          <p>
            Budget Planner is designed to help you take control of your personal finances 
            through simple and effective budget management. We believe that everyone deserves 
            access to tools that make financial planning straightforward and stress-free.
          </p>
        </section>

        <section className="about-section">
          <h2>Features</h2>
          <div className="features-list">
            <div className="feature">
              <h3>🎯 Budget Creation</h3>
              <p>Create monthly budgets with custom categories to organize your spending</p>
            </div>
            <div className="feature">
              <h3>💰 Expense Tracking</h3>
              <p>Track your daily expenses and categorize them for better insights</p>
            </div>
            <div className="feature">
              <h3>📊 Financial Analytics</h3>
              <p>View detailed statistics and insights about your spending patterns</p>
            </div>
            <div className="feature">
              <h3>🔒 Secure & Private</h3>
              <p>Your financial data is encrypted and stored securely</p>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2>How It Works</h2>
          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h4>Create Account</h4>
                <p>Sign up for a free account to get started</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h4>Set Budget</h4>
                <p>Create your monthly budget with spending categories</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h4>Track Expenses</h4>
                <p>Add your daily expenses and monitor your spending</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <div className="step-content">
                <h4>Analyze & Improve</h4>
                <p>Review your statistics and optimize your budget</p>
              </div>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2>Technology Stack</h2>
          <p>
            Built with modern web technologies including React, Node.js, Express, 
            and MongoDB to provide a fast, reliable, and scalable experience.
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;