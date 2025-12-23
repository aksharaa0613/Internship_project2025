# Budget Planner - Complete MERN Stack Application

## Project Overview
A full-stack budget planning application built with:
- **Frontend**: React (Vite) + React Router + Axios
- **Backend**: Node.js + Express + MongoDB + JWT Authentication
- **Database**: MongoDB Atlas
- **Deployment**: Backend on Render, Frontend on Vercel

## Setup Instructions

### Backend Setup (mernBackend2025)

1. **Install Dependencies**
   ```bash
   cd mernBackend2025
   npm install
   ```

2. **Environment Variables**
   Create `.env` file with:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/budgetplanner
   JWT_SECRET=your_super_secret_jwt_key_here
   PORT=5000
   ```

3. **MongoDB Atlas Setup**
   - Create account at https://cloud.mongodb.com
   - Create new cluster
   - Get connection string
   - Replace username, password, and database name in MONGODB_URI

4. **Run Development Server**
   ```bash
   npm run dev
   ```

### Frontend Setup (mernFrontend2025)

1. **Install Dependencies**
   ```bash
   cd mernFrontend2025
   npm install
   ```

2. **Update API URL**
   In `src/components/functionalComponents/Hooks/useAuth.jsx`, `useBudget.jsx`, and `useExpense.jsx`:
   ```javascript
   const API_URL = 'https://your-render-backend-url.onrender.com/api';
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```

## Deployment Instructions

### Backend Deployment (Render)

1. **Push to GitHub**
   - Create GitHub repository
   - Push backend code to repository

2. **Deploy on Render**
   - Go to https://render.com
   - Create new Web Service
   - Connect GitHub repository
   - Set build command: `npm install`
   - Set start command: `npm start`
   - Add environment variables:
     - `MONGODB_URI`: Your MongoDB Atlas connection string
     - `JWT_SECRET`: Your JWT secret key
     - `NODE_ENV`: production

3. **Get Render URL**
   - Copy your Render app URL (e.g., https://your-app.onrender.com)

### Frontend Deployment (Vercel)

1. **Update API URLs**
   Replace all instances of `https://your-render-backend-url.onrender.com/api` with your actual Render URL

2. **Push to GitHub**
   - Create GitHub repository for frontend
   - Push frontend code to repository

3. **Deploy on Vercel**
   - Go to https://vercel.com
   - Import GitHub repository
   - Vercel will auto-detect Vite configuration
   - Deploy automatically

## Features Implemented

### Authentication
- ✅ User registration with validation
- ✅ User login with JWT tokens
- ✅ Protected routes
- ✅ Automatic token management

### Budget Management
- ✅ Create monthly budgets
- ✅ Budget categories
- ✅ View all budgets
- ✅ Delete budgets
- ✅ Budget progress tracking

### Expense Management
- ✅ Add expenses to budgets
- ✅ Categorize expenses
- ✅ View expense history
- ✅ Edit/delete expenses

### Dashboard & Analytics
- ✅ Financial overview dashboard
- ✅ Budget vs expense comparison
- ✅ Category-wise spending analysis
- ✅ Monthly spending trends
- ✅ Financial insights

### UI/UX
- ✅ Responsive design
- ✅ Clean, modern interface
- ✅ Loading states
- ✅ Error handling
- ✅ Form validation

## API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login

### Budgets
- `GET /api/budgets` - Get user budgets
- `POST /api/budgets` - Create budget
- `GET /api/budgets/:id` - Get specific budget
- `PUT /api/budgets/:id` - Update budget
- `DELETE /api/budgets/:id` - Delete budget

### Expenses
- `GET /api/expenses` - Get user expenses
- `POST /api/expenses` - Create expense
- `GET /api/expenses/:id` - Get specific expense
- `PUT /api/expenses/:id` - Update expense
- `DELETE /api/expenses/:id` - Delete expense

## Security Features
- Password hashing with bcryptjs
- JWT token authentication
- Protected API routes
- Input validation
- CORS configuration

## Technologies Used

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing
- CORS for cross-origin requests

### Frontend
- React 18
- Vite for build tooling
- React Router for navigation
- Axios for API calls
- Custom hooks for state management
- CSS3 for styling

## Project Structure Maintained
The project strictly follows the required folder structure with all files in their designated locations.

## Production Ready Features
- Environment variable configuration
- Error handling and validation
- Responsive design
- Loading states
- User feedback
- Secure authentication
- Optimized build process