// let express = require('express');
// let app = express();
// let allroutes = require('./routes/AllRoutes');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv = require("dotenv"); //loads environment variables from a .env file into process.env.
// dotenv.config();//loads environment variables from a .env file into process.env.
// app.use(express.json());
// const stripe = require('stripe')('sk_test_51OyWJxSAZ9k8UIed5OjqpD8P8Nxxjdbbfl33tFHWGE8mkgmnIqPgFzsZRLq0FUvshkCDqPCf0Yz2a4WDCDWf0KP300QMzcxguM');

// let corspolicy = {
//     origin:"http://localhost:3000"
// }
// app.use(cors(corspolicy));

// // logs the timestamp of each incoming request to the console and then calls the next() function
// app.use((req,res,next) => {
//     console.log(" Request received at " + (new Date()));
//     next();
// });

// allroutes.get('/',(req,res) => {
//     console.log(" reached root");
//     res.send("Welcome to realgrande back end server");
// });
// // connect to the database
// // schema
// // model
// // from middleware, using model to get data from DB


// // connect
// let db = async () => { 
//     try{ 
//         console.log(process.env.DBURI);
//         await mongoose.connect(process.env.DBURI);
//         console.log(" connected to database");
//     }
//     catch(err) {
//         console.log(' error connecting');
//     }
// }
// db();


// //all routes defined in the allroutes middleware will be prefixed with '/api'.
// app.use('/api',allroutes);

// // connect to the database
// // schema
// // model
// // from middleware, use model to get data from DB



// // app.get('/',(req,res) => {
// //         console.log(" reached root");
// //         res.send("Welcome to realgrande back end server");
// //     });
// app.listen(5001,()=>{ console.log("Backend server listening at port 5001")});

const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require("dotenv");

dotenv.config();
const app = express();
const path = require("path");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Serve static files
app.use(express.static(path.join(__dirname, "build")));

// Logging middleware
app.use((req, res, next) => {
    console.log("Request received at " + new Date());
    next();
});

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/realmarketplace?retryWrites=true&w=majority")
    .then(() => console.log("Connected to database"))
    .catch(err => console.error("Error connecting to database:", err));

// Routes
const allroutes = require("./routes/AllRoutes");
app.use("/api", allroutes);

// Serve React app for any other route
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Not found handler
app.use((_, res) => {
    res.status(404).json({
        success: false,
        message: "Not found!"
    });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on Port: ${PORT}`);
});
