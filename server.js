const express = require('express');
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');

const app = express();
const PORT = process.env.PORT || 3500;

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));

app.use(express.json());


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));