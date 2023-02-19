const mongoose = require("mongoose");

// Define schema for collection "enquiry" in cardealership2 database

const enquirySchema = new mongoose.Schema({
    empId : {
        type : String,
        required : true
    },
    vehicleName : {
        type : String,
        required : true
    },
    date : {
        type : Date        
    },
    customerName : {
        type : String,
        required : true
    },
    customerMobileNo : {
        type : Number,
        required : true
    }
});

// Define Collection "Enquiry" i.e. mongoose model for enquirySchema defined above

const Enquiry = new mongoose.model("Enquiry", enquirySchema);

module.exports = Enquiry;