const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const router = new express.Router();
const {authUser, authRole} = require("../middleware/authentication");

router.post('/login', async(req, res) => {
    try{
      const userDocument = await User.findOne({username : req.body.username});

      const isAuthentic = await bcrypt.compare(req.body.password, userDocument.password);

      if(isAuthentic){
         const token = await userDocument.generateJWToken();
         console.log(userDocument);
         res.cookie(
            "jwt",
            token
         );

         res.status(201).send(
            {
               cookie_token : token,
               userId : userDocument._id
            }
         );
      }
      else{
         res.send({message : "Invalid Credentials"});
      }
      
    }catch(exp){
       console.error(exp);
       res.status(400).send(exp);
   }
});

router.get('/logout',authUser, authRole(["employee", "manager", "admin"]), async(req, res) => {

   try{
         res.clearCookie("jwt");
         res.status(201).send("logout");

      }catch(exp){
         console.error(exp);
         res.status(400).send(exp);
   }
    
});

module.exports = router;