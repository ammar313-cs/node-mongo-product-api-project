const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');

dotenv.config();

const app = express();

// Middleware applied 
app.use(express.json());

// Apply to use HTTP Basic Auth Middleware to all routes
// app.use(httpAuthMiddleware);

// Apply to use JWT Auth  Middleware to all routes
// app.use('/api/products', jwtAuthMiddleware, productRoutes);

//User Route applied here 
app.use('/api/users', userRoutes);

connectDB();

// Route for product applied here 
app.use('/api/products', productRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
