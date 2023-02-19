const express = require("express");
const User = require("../models/user");
const Enquiry = require("../models/enquiry");
const {authUser, authRole} = require("../middleware/authentication");
const router = new express.Router();

router.post('/registerUser',authUser, authRole(["admin"]), async(req, res) => { // Admin
      try{
         const newUserDocument = new User(req.body);
         /* Input document structure
         {
            profile : {
               name : name,
               mobileNo : mobileNo,
               designation : desig
            },
            username : UsernameReg,
            password : passwordReg,
            role : role,
            department : dept,
            managerialDepartment : mngDept,      
            sal : sal,
            email : emailReg
         }
         */
         const token = await newUserDocument.generateJWToken();
         await newUserDocument.save();
         
         res.status(201).send(newUserDocument);
      }catch(exp){
         console.error(exp);
         res.status(400).send(exp);
      }
});  

router.get('/userDetails',authUser, authRole(["admin"]), async(req, res) => { // Admin
    try{
       const result = await User.find();
       res.status(201).send(result);
    }catch(exp){
      console.error(exp);
       res.status(400).send(exp);
    }
});
    
router.put('/updateUser',authUser, authRole(["admin"]), async(req, res) => { // Admin
    
   // Parameters expected from front-end
    newUsername = req.body.newUsername;
    oldUsername = req.body.oldUsername;
    password = req.body.password;
    role = req.body.role;
    email = req.body.email;

    try{
       const result = await User.updateOne(
          {username : oldUsername},
          { $set : { 
                username : newUsername,
                password : password,
                role : role,
                email : email
             } 
          }
       );

       res.status(201).send(result);

    }catch(exp){
      console.error(exp);
       res.status(400).send(exp);
    }
    
});

router.delete("/deleteUser/:id",authUser, authRole(["admin"]), async(req, res) => { // Admin
    try{
        const result = await User.deleteOne(
        {_id : req.params.id}
        );
        console.log("Reached backend successfully" + String(req.params.id));
        console.log(result);
        res.status(201).send(result);

    }catch(exp){
      console.error(exp);
        res.status(400).send(exp);
    }
});

router.get('/enquiryDetails',authUser, authRole(["admin"]), async(req, res) => { // Admin
    try{
       const result = await Enquiry.find();
       console.log(result);
       res.status(201).send(result);
    }catch(exp){
       console.error(exp);
       res.status(400).send(exp);
    }
});

router.get('/employeeDetails',authUser, authRole(["admin"]), async(req, res) => { // Admin
   try{
      const result = await User.find({
         role : {$ne : "admin"}
      });
      res.status(201).send(result);
   }catch(exp){
      console.error(exp);
      res.status(400).send(exp);
   }
});
   
module.exports = router;
