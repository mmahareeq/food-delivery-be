const mongoose = require('mongoose');

const database = "mongodb+srv://food:password@cluster0.hh9xphb.mongodb.net/test";
mongoose.set("strictQuery", false);

const connectDb = async ()=>{
    try {
        await mongoose.connect(database);
          console.log("DB Connection Successfull!")
    } catch (error) {
        console.log(error);
        
    }
}

module.exports = connectDb;