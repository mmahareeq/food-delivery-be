const isAdminAuth = (req, res, next)=>{
    if(req.session.isAdmin)
    {
        next();
    }else{
        res.status(400).json('Unauthication');
    }
};

module.exports = isAdminAuth;