require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Define schema for collection "User" in cardealership2 database

const userSchema = new mongoose.Schema({
    profile : {
        name : {
            type : String,
            required : true
        },
        mobileNo : Number,
        designation : {
            type : String,
            required : true
        }
    },
    username : {
        type : String,
        unique : true,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    role : {
        type : String,
        required : true,
    },
    department : {
        type : String,
        required : true,
    },
    managerialDepartment : {
        type : String,
        default : "NA"
    },
    salary : {
        type : Number,
        required : true,
        default : 0        
    },
    email : {
        type : String,
        unique : true,
        required : true
    },
    target : {
        booking : {
            type : Number,
            default : 0
        },
        enquiry : {
            type : Number,
            default : 0
        }
    }
});

userSchema.methods.generateJWToken = async function(){
    try{
        const token = await jwt.sign(
            { 
                _id : this._id.toString()
            }, 
            process.env.SECRET_KEY,
            {
                expiresIn : '20000s'
            }
        );
        return token;
    }catch(exp){
        console.log("exp" + exp);
    }
}

// Like a trigger
userSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10);
    }
    console.log(this);
    next();
});

// Define Collection "Users" i.e. mongoose model for userSchema defined above

const User = new mongoose.model("User", userSchema);

module.exports = User;