const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Use connection string from environment variables
    const dbURI = process.env.MONGO_URI;
    
    // Connect to MongoDB
    await mongoose.connect(dbURI, { 
      useNewUrlParser: true, 
      useUnifiedTopology: true 
    });

    console.log('MongoDB connected...');
  } catch (error) {
    console.error('Database connection error:', error.message);
    process.exit(1); // Exit the app if database connection fails
  }
};

module.exports = connectDB;
