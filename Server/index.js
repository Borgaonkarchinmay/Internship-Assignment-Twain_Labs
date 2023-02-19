require("dotenv").config();
require("./db/connections");
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const accessRoutes = require("./routes/applicationAccessRoutes");
const adminRoutes = require("./routes/adminRoutes");
const enquiryRoutes = require("./routes/enquiryRoutes");
const managerRoutes = require("./routes/managerRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended : true}));

app.use(accessRoutes);
app.use('/admin', adminRoutes);
app.use(enquiryRoutes);
app.use('/manager', managerRoutes);
app.use('/employee', employeeRoutes);


app.listen(port, () =>{
   console.log(`server running at port : ${port}`); 
});
