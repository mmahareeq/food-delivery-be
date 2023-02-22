const UserModel = require('../model/user');

const isAdminAuth = async (req, res, next)=>{
    if(req.session.islogin)
    {
        const user = await UserModel.findOneById(req.session.user).exec();
        if(user && user.role === 'admin'){
           next();
        }else{
            return res.status(400).json({message: 'authorized'})
        }
       
    }else{
        res.status(400).json('Unauthication');
    }
};

module.exports = isAdminAuth;