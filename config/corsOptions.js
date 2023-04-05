const whileList = ['http://localhost:3000','https://localhost:3000'];

const corsOptions = {
    origin: (origin, callback)=>{
        if(whileList.indexOf(origin) != -1){
            callback(null, true);
        }else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    optionsSuccessStatus: 200
};

module.exports = corsOptions