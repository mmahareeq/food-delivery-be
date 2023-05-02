const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require("connect-mongodb-session")(session);
const dotenv = require('dotenv');
dotenv.config();
mongoose.set("strictQuery", false);

const databaseURI = () => {
    let databaseUrl = '';
    if(process.env.NODE_ENV === 'production'){
        databaseUrl =process.env.DATA_BASE_URL;
    }else{
        const host = process.env.MONGO_HOST || 'localhost';
    const port = parseInt(process.env.MONGO_PORT, 10) || 27017;
    const username = process.env.MONGO_USER || '';
    const password = process.env.MONGO_PWD || '';
    const db = process.env.MONGO_DB || 'food-devilry';

    const connectionArgs = ['mongodb://'];

    if (username && password) {
        connectionArgs.push(`${username}:${password}@`);
    }

    connectionArgs.push(`${host}:${port}/${db}`);
    databaseUrl = connectionArgs.join('');
    }
    
    return databaseUrl;
}

const connectDb = async () => {

    const databaseUrl = databaseURI();
    try {
        await mongoose.connect(databaseUrl);
    } catch (error) {
       console.log(error);
      //  return error;

    }
}

const sessionCollection = () => {
    const store =  new MongoDBStore({
        uri: databaseURI(),
        collection: "cartSessions",
    });

    return store;
}
module.exports = {connectDb, sessionCollection};