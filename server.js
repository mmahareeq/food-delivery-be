const express = require('express');
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const multer = require('multer')
const app = express();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3500;

const database = "mongodb+srv://food:<password>@cluster0.hh9xphb.mongodb.net/test";
mongoose.set("strictQuery", false);
mongoose
  .connect(database)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
});

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use('/images', express.static(path.join(__dirname, '/images')));

app.use('/product', require('./routes/product'))

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));