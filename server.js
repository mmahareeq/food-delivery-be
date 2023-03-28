const express = require('express');
const path = require('path');
const cors = require('cors');
const session = require('express-session');
const MongoDBStore = require("connect-mongodb-session")(session);
const corsOptions = require('./config/corsOptions');
const multer = require('multer')
const errorHandler = require('./middleware/errorHandler');
const {connectDb, sessionCollection} = require('./config/db');
const auth = require('./middleware/authentication');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3500;
const app = express();

connectDb()

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use('/images', express.static(path.join(__dirname, '/images')));
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'Il}/mav@hCn*CK!>""Zx=6?%p&oLgz<y',
    resave: false,
    saveUninitialized: false,
    store: sessionCollection(),
  })
);


// ======================= Routes
app.use('/product', require('./routes/product'));
app.use('/order', auth, require('./routes/order'));
app.use('/cart', require('./routes/cart'));
app.use('/category', require('./routes/category'));
app.use('/password', require('./routes/user'));
app.use('/session', require('./routes/user'));

app.use(errorHandler);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));