const axios = require('axios');

const API_URL = 'http://localhost:5000/api';

async function testBackend() {
  try {
    console.log('Testing backend connection...');
    
    // Test basic connection
    const testResponse = await axios.get('http://localhost:5000/api/test');
    console.log('✅ Backend is running:', testResponse.data);
    
    // Test signup
    const signupData = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123'
    };
    
    try {
      const signupResponse = await axios.post(`${API_URL}/auth/signup`, signupData);
      console.log('✅ Signup successful:', signupResponse.data);
    } catch (error) {
      if (error.response?.data?.message === 'User already exists') {
        console.log('ℹ️ User already exists, trying login...');
      } else {
        console.error('❌ Signup failed:', error.response?.data || error.message);
      }
    }
    
    // Test login
    const loginData = {
      email: 'test@example.com',
      password: 'password123'
    };
    
    const loginResponse = await axios.post(`${API_URL}/auth/login`, loginData);
    console.log('✅ Login successful:', loginResponse.data);
    
    const token = loginResponse.data.token;
    
    // Test budget creation
    const budgetData = {
      month: 'January',
      year: 2025,
      totalBudget: 1000,
      categories: [
        { name: 'Food', amount: 300 },
        { name: 'Transport', amount: 200 }
      ]
    };
    
    const budgetResponse = await axios.post(`${API_URL}/budgets`, budgetData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ Budget creation successful:', budgetResponse.data);
    
  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
  }
}

testBackend();