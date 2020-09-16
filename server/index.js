const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();
connectDB();
const PORT = process.env.PORT || 4000;

app.use(express.json());
const corsOpts = {
  origin: process.env.FRONT_URL
}
app.use(cors(corsOpts));

app.use(express.static('uploads'));

//Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/links', require('./routes/links'));
app.use('/api/files', require('./routes/files'));


app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor corriendo en el ${PORT}`);
})