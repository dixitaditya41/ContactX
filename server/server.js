const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require('cookie-parser');
const authRoutes = require("./routes/authRoute");
const { mongoDbConnect } = require("./config/db");
const contactRoutes = require('./routes/contactRoutes');

const EventEmitter = require('events');
const bus = new EventEmitter();
bus.setMaxListeners(20);

const PORT = process.env.PORT || 5000;

dotenv.config();

// MongoDB Connection
mongoDbConnect();

// Middleware
app.use(cookieParser());

// CORS Middleware Configuration
app.use(cors({
  origin: "http://localhost:3000", 
  credentials: true,              
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);  // User auth routes
app.use('/api/contacts', contactRoutes); // Contact routes

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
