const mongoose = require('mongoose');

const connectDB = async () => {

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      
    }).then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Could not connect to MongoDB...', err));
    console.log('DB connected: ${conn.connection.host}');

  } 
  catch (error) {

    console.error('Database connection failed', error);
    process.exit(1);

  }
};

module.exports = connectDB;
