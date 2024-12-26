const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Mongoose 6.x doesn't require these deprecated options anymore
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected...');
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit the process with a failure code
  }
};

module.exports = connectDB;
