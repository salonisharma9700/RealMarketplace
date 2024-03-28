// to create our express app
const express = require("express");

// initialize the express app
const app = express();
// package to handle file paths
const path = require("path");

const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require("dotenv");
dotenv.config();
app.use(express.json());


// let corspolicy = {
//     origin:"http://localhost:4000"
// }
// app.use(cors(corspolicy));

app.use((req,res,next) => {
    console.log(" Request received at " + (new Date()));
    next();
});




// our custom routes
const allroutes = require("./routes/AllRoutes");


// set the port (you could use any but usually it is 5000)
const port = process.env.PORT || 4000;

// next two lines tells parse requests of content-type
// which are application/x-www-form-urlencoded and json respectively
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// to make build folder static
app.use(express.static(path.join(__dirname, "build")));


//connect to DB
// connect
app.use((req,res,next) => {
    console.log(" Request received at " + (new Date()));
    let db = async () => { 
        try{ 
            console.log("mongodb://localhost:27017/realmarketplace?retryWrites=true&w=majority");
            await mongoose.connect("mongodb://localhost:27017/realmarketplace?retryWrites=true&w=majority");
            console.log(" connected to database");
        }
        catch(err) {
            console.log(' error connecting');
            res.status(500).send(err);
        }
    }
    db();
    next();
});



// allroutes are the routes your backend will use
// by convention we use /api before any backend routes
app.use("/api", allroutes);

// ...

// If user hits the / route we will be
// shown our react frontend app as we are
// returning the content of build folder
app.use((_, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// If user hits the route that donot exist
// we will show not found message
app.use((_, res) => {
  res.status(404).json({
    success: false,
    message: "Not found!",
  });
});

// Launch app to listen to specified port
app.listen(port, () => {
  console.log(`Your server is running on Port: ${port}`);
});