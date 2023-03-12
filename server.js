const express = require('express');
const path = require('path');
const cors = require('cors');
const session = require('express-session');
const MongoDBStore = require("connect-mongodb-session")(session);
const corsOptions = require('./config/corsOptions');
const multer = require('multer')
const errorHandler = require('./middleware/errorHandler');
const connectDb = require('./config/db');
const auth = require('./middleware/authentication');
const PORT = process.env.PORT || 3500;
const app = express();

connectDb()
const database = process.env.MONGODB;

const store = new MongoDBStore({
    uri: database,
    collection: "cartSessions",
});
const store2 = new MongoDBStore({
  uri: database,
  collection: "userSessions",
});

app.use(cors());

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use('/images', express.static(path.join(__dirname, '/images')));
app.use('/admin',
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    store: store2,
  })
, 
  require('./routes/product')
)
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);


// ======================= Routes
app.use('/product', auth,require('./routes/product'));
app.use('/order', auth, require('./routes/order'));
app.use('/cart', require('./routes/cart'));
app.use('/session', require('./routes/user'));

app.use(errorHandler);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));