const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const httpAuthMiddleware = require('./middlewares/httpAuthMiddleware');

dotenv.config();

const app = express();

// Middleware applied 
app.use(express.json());

// Apply to use HTTP Basic Auth Middleware to all routes
if (process.env.NODE_ENV !== 'test' && process.env.NODE_ENV !== 'development') {
    app.use(httpAuthMiddleware);
  }
  
// Apply to use JWT Auth  Middleware to all routes
// app.use('/api/products', jwtAuthMiddleware, productRoutes);

//User Route applied here 
app.use('/api/users',userRoutes);

connectDB();

// Route for product applied here 
app.use('/api/products',productRoutes);


const PORT = process.env.PORT || 5001;
if (require.main === module) {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}


module.exports = app; 
