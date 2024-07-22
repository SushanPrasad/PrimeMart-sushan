import path from 'path';
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
// Load environment variables
dotenv.config();

import db from "../backend/config/db.js";
import productRoutes from "../backend/routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import uploadRoutes from "./routes/uploadRoutes.js";

const port = process.env.PORT || 5000;

// Connect to MongoDB
db();

const app = express();

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// cookie-parser
app.use(cookieParser());

// Routes
// app.get("/", (req, res) => {
//   res.send('API is running check it....');
// });

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes); // Corrected typo here

app.get('/api/config/paypal', (req, res) => 
      res.send({ clientId: process.env.PAYPAL_CLIENT_ID }));

const __dirname = path.resolve(); // Set __dirname to current directory
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

//deploy below

if(process.env.NODE_ENV === 'production'){

  app.use(express.static(path.join(__dirname, '/ecommerce/build')))   //setup folder for build


  app.get('*', (req,res) => 
     res.sendFile(path.resolve(__dirname, 'ecommerce', 'build', 'index.html')))   //build deploy direct top index.html

} else{
  app.get("/", (req, res) => {
    res.send('API is running check it....');
  });
  
}

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Start the server
app.listen(port, () => console.log(`Server running on port ${port}`));
