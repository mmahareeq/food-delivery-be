const express = require('express');
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const multer = require('multer')
const app = express();
const connectDb = require('./config/db');
const PORT = process.env.PORT || 3500;


connectDb()
//app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use('/images', express.static(path.join(__dirname, '/images')));

app.use('/product', require('./routes/product'));
app.use('/order', require('./routes/order'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));