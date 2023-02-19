const express = require("express");
const Enquiry = require("../models/enquiry");
const User = require("../models/user");
const router = new express.Router();
const {authUser, authRole} = require("../middleware/authentication");

router.get('/enqDetails',authUser, authRole(["employee", "manager", "admin"]), async(req, res) => { // Employee
   try{
      const result = await Enquiry.find({
         empId : req.userData.username // After authorization
      });
      
      res.status(201).send(result);
   }catch(exp){
      console.error(exp);
      res.status(400).send(exp);
   }
});

router.get('/targetDetails',authUser, authRole(["employee", "manager", "admin"]), async(req, res) => { // Employee
   try{
      const result = await User.find({
         username : req.userData.username // After authorization
      }
      ).select({
         target : 1
      });
      
      res.status(201).send(result);
   }catch(exp){
      console.error(exp);
      res.status(400).send(exp);
   }
});

router.get('/profile',authUser, authRole(["employee", "manager", "admin"]), async(req, res) => { // Employee Manager
   try{
      const result = await User.find({
         username : req.userData.username // After authorization
      }
      ).select({
         profile : 1,
         email : 1,
         managerialDepartment : 1,
         salary : 1,
      });

      res.status(201).send(result);
   }catch(exp){
      console.error(exp);
      res.status(400).send(exp);
   }
});

module.exports = router;
