const express = require("express");
const User = require("../models/user");
const router = new express.Router();
const {authUser, authRole} = require("../middleware/authentication");

router.get('/employeeDetails',authUser, authRole(["manager", "admin"]), async(req, res) => { // Manager Admin
   try{
      const result = await User.find({
         department : req.userData.department // After authorization
                                              // Each department has only one manager assumption
      });
      
      res.status(201).send(result);
   }catch(exp){
      console.error(exp);
      res.status(400).send(exp);
   }
});

router.put('/updateTarget',authUser, authRole(["manager", "admin"]), async(req, res) => { // Manager Admin
   try{
      
      const request_emp_deptartment = await User.find({
         _id : req.body.EmpId
      }).select({
         department : 1
      });

      if(request_emp_deptartment[0].department === req.userData.department){ // Check whether the employee 
                                             // Belongs to managers department (corner case)
         const result = await User.updateOne(
            {_id : req.body.EmpId}, // req body : Id of employee to whom target is to be assigned
            { $set : { 
                  target : {  // req body
                     booking : req.body.bookings,
                     enquiry : req.body.enquirys
                  }
               } 
            }
         );

         res.status(201).send(result);
      }
      
      else{
         res.send({message : "Employee out of scope"});
      }

   }catch(exp){
      console.error(exp);
      res.status(400).send(exp);
   }
});

module.exports = router;
