const jwt = require("jsonwebtoken");
const User = require("../models/user");

const authUser = async (req, res, next)=>{
    try{
        const token = req.cookies.jwt;
        
        const authenticUser = jwt.verify(token, process.env.SECRET_KEY);

        const user = await User.findOne({_id : authenticUser._id});
        req.userData = user;

        next();

    }catch(exp){
        res.status(400).send({message : "Unauthorized token detected!"});
    }
};

const authRole = (permitted_roles)=>{
    return (req, res, next) => {
        try{
            if(permitted_roles.includes(req.userData.role)){
                next();
            }
            else{
                return res.status(401).send({status : "You are UNAUTHORIZED to use this functionality"}); 
            }
        }catch(exp){
            res.status(400).send(exp);
        }
    }
};

module.exports = {authUser, authRole};
