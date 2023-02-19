const express = require("express");
const Enquiry = require("../models/enquiry");
const router = new express.Router();
const {authUser, authRole} = require("../middleware/authentication");


router.post('/addEnq',authUser, authRole(["employee", "manager", "admin"]), async(req, res) => { // Employee Admin Manager
    try{
       const newDocument = new Enquiry(req.body);
 
       const result = await newDocument.save();
       console.log(result);
       res.status(201).send(result);
 
    }catch(exp){
       cconsole.error(exp);
       res.status(400).send(exp);
    }
});    

router.put('/updateEnq',authUser, authRole(["employee", "manager", "admin"]), async(req, res) => { // Employee Admin Manager
    vehicle = req.body.veh;
    cust_name = req.body.cust_name;
    cust_mobno = req.body.cust_mobno;
    empId = req.body.empId;

    try{
       const result = await Enquiry.updateOne(
          {empId : empId},
          { $set : { 
                vehicle : vehicle,
                customerName : cust_name,
                customerMobileNo : cust_mobno,
             } 
          }
       );

       res.status(201).send(result);

    }catch(exp){
      console.error(exp);
       res.status(400).send(exp);
    }
});

router.delete("/deleteEnq/:id",authUser, authRole(["manager", "admin"]), async(req, res) => { // Admin Manager
    try{
        const result = await Enquiry.deleteOne(
        {_id : req.params.id} // Document's Id
        );

        res.status(201).send(result);

    }catch(exp){
      console.error(exp);
        res.status(400).send(exp);
    }
});

module.exports = router;
