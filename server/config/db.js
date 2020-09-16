const mongoose = require('mongoose');
require('dotenv').config({ path: 'variables.env' });

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    })
    console.log('Base de datos conectada');
  } catch (error) {
    console.log('Algo salió mal', error)
    process.exit(1);
  }
}

module.exports = connectDB;