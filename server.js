const express = require('express');
const path = require('path');
const cors = require('cors');
const session = require('express-session');
const corsOptions = require('./config/corsOptions');
const multer = require('multer')
const errorHandler = require('./middleware/errorHandler');
const {connectDb, sessionCollection} = require('./config/db');
const auth = require('./middleware/authentication');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3500;
const app = express();
app.set("trust proxy", 1);
connectDb()

app.use(cors(corsOptions))
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
     expires: new Date(Date.now() + (7 * 24 * 60 * 60 * 1000)),
     cookie: { 
      expires: new Date(Date.now() + (7 * 24 * 60 * 60 * 1000)),
      sameSite: process.env.NODE_ENV === "production" ? 'none' : 'lax', // must be 'none' to enable cross-site delivery
      secure: process.env.NODE_ENV === "production", // must be true if sameSite='none'
    }
  })
);


// ======================= Routes
app.use('/products', require('./routes/products'));
app.use('/orders', auth, require('./routes/orders'));
app.use('/carts', require('./routes/carts'));
app.use('/categories', require('./routes/categories'));
app.use('/password', require('./routes/users'));
app.use('/session', require('./routes/users'));

app.use(errorHandler);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));