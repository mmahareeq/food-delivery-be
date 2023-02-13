const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const database = process.env.MONGODB;;
mongoose.set("strictQuery", false);

const connectDb = async ()=>{
    try {
        await mongoose.connect(database);
          console.log("DB Connection Successfull!");
    } catch (error) {
        console.log(error);
        
    }
}

module.exports = connectDb;