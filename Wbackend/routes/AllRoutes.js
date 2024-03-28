// let express = require("express");
// const {housesModel,usersModel,enquiriesModel} = require("../models/allschemas");
// let allroutes = express.Router();
// const multer = require("multer");
// const upload = multer();
// const stripe = require('stripe')('sk_test_51OyWJxSAZ9k8UIed5OjqpD8P8Nxxjdbbfl33tFHWGE8mkgmnIqPgFzsZRLq0FUvshkCDqPCf0Yz2a4WDCDWf0KP300QMzcxguM');

// // const jwt = require('jsonwebtoken');
// // const bcrypt = require('bcryptjs');
// // const auth = require('./au');


// allroutes.get('/',(req,res) => {
//     console.log(" reached root");
//     res.send("Welcome to real estate market place back end service");
// });

// allroutes.get('/houses',async (req,res) => {
//     console.log(" reached /houses");
//     try{
//         let houses = await housesModel.find({});
//         res.send(houses);
//     }
//     catch(err){
//         console.log(err);
//         res.status(500).send(" error while fetching houses");
//     }
    
// });

// allroutes.get('/house/:id',async (req,res) => {
//     console.log(" reached /house" + req.params.id);
//     let myid = parseInt(req.params.id);
//     try{
//         console.log("id"+req.params.id);
//         let house = await housesModel.findOne({id:myid});
//         console.log(house);
//         res.send(house);
//     }
//     catch(err){
//         console.log(err);
//         res.status(500).send(" error while fetching houses");
//     }
    
// });

// allroutes.post('/signup',upload.none(),async (req,res) =>{
//     //store data in DB using model , and send the newly created object
//     try{ 
//         console.log(req.body);
//         // use model and save to back end
//         let newuser = new usersModel(req.body)
//         let userFromDB = await newuser.save();
//         console.log(userFromDB);
//         res.send(userFromDB);
//     }
//     catch(err){
//         //check whether user already exists or send appropriate message
//         // error code 1100
//         console.log(" error while adding user. check if it is duplicate");
//         console.log(err);
//         res.status(500).send(err)
//     }
// });

// // without JWT
// allroutes.post('/login',upload.none(),async (req,res) =>{
//     //check email password DB using model , and send a success response
//     try{ 
//         console.log(req.body);
//         // use model and find  
//         let response = await usersModel.find({email:req.body.email,password:req.body.password});
//         console.log(response);        
//         res.send(response);       
//     }
//     catch(err){
//         console.log(err);
//         res.status(500).send(err)
//     }
// });

// // with JWT
// // allroutes.post('/login', upload.none(), async (req, res) => {
// //     try {
// //         // Retrieve user credentials from request body
// //         const { email, password } = req.body;

// //         // Check if the user exists in the database
// //         const user = await usersModel.findOne({ email });

// //         // If user not found or password is incorrect, return error
// //         if (!user || !bcrypt.compareSync(password, user.password)) {
// //             return res.status(401).json({ error: 'Invalid email or password' });
// //         }

// //         // Generate JWT token with user ID as payload
// //         const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

// //         // Set the token as an HTTP-only cookie
// //         res.cookie('token', token, { httpOnly: true });

// //         // Send success response
// //         res.json({ success: true });
// //     } catch (err) {
// //         console.error(err);
// //         res.status(500).send('Server Error');
// //     }
// // });


//   allroutes.post('/addenquiry',upload.none(),async (req,res) =>{
//     //get all details and store in db
//     try{ 
//         console.log(req.body);
//         // use model and save to back end
//         let newEnquiry = new enquiriesModel(req.body)
//         let enquirySavedFromDB = await newEnquiry.save();
//         console.log(enquirySavedFromDB);
//         res.send(enquirySavedFromDB);
//     }
//     catch(err){
//         console.log(" error while adding enquiry.");
//         console.log(err);
//         res.status(500).send(err)
//     }
// });


// allroutes.get('/enquiries',async (req,res) => {
//     console.log(" reached /enquiries");
//     try{
//         let enquiries = await enquiriesModel.find({});
//         res.send(enquiries);
//     }
//     catch(err){
//         console.log(err);
//         res.status(500).send(" error while fetching enquiries");
//     }
    
// });

// allroutes.post('/create-payment-intent', getfields.none(),async (req, res) => {
//     console.log(req.body);
//     const { mamount } = req.body;

//     const paymentIntent = await stripe.paymentIntents.create({
//         amount:mamount,
//         currency: 'usd',
//     });
//     //res.json({ clientSecret: paymentIntent.client_secret });
//     res.status(200).send({ clientSecret: paymentIntent.client_secret });
// });

// module.exports = allroutes;



let express = require("express");
const {housesModel,usersModel,enquiriesModel} = require("../models/allschemas");
let allroutes = express.Router();
const multer = require("multer");
const upload = multer();
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');
// const auth = require('./au');
const stripe = require('stripe')('sk_test_51OyWJxSAZ9k8UIed5OjqpD8P8Nxxjdbbfl33tFHWGE8mkgmnIqPgFzsZRLq0FUvshkCDqPCf0Yz2a4WDCDWf0KP300QMzcxguM');


allroutes.get('/',(req,res) => {
    console.log(" reached root");
    res.send("Welcome to real estate market place back end service");
});

allroutes.get('/houses',async (req,res) => {
    console.log(" reached /houses");
    try{
        let houses = await housesModel.find({});
        res.send(houses);
    }
    catch(err){
        console.log(err);
        res.status(500).send(" error while fetching houses");
    }
    
});

allroutes.get('/house/:id',async (req,res) => {
    console.log(" reached /house" + req.params.id);
    let myid = parseInt(req.params.id);
    try{
        console.log("id"+req.params.id);
        let house = await housesModel.findOne({id:myid});
        console.log(house);
        res.send(house);
    }
    catch(err){
        console.log(err);
        res.status(500).send(" error while fetching houses");
    }
    
});

allroutes.post('/signup',upload.none(),async (req,res) =>{
    //store data in DB using model , and send the newly created object
    try{ 
        console.log(req.body);
        // use model and save to back end
        let newuser = new usersModel(req.body)
        let userFromDB = await newuser.save();
        console.log(userFromDB);
        res.send(userFromDB);
    }
    catch(err){
        //check whether user already exists or send appropriate message
        // error code 1100
        console.log(" error while adding user. check if it is duplicate");
        console.log(err);
        res.status(500).send(err)
    }
});

// without JWT
allroutes.post('/login',upload.none(),async (req,res) =>{
    //check email password DB using model , and send a success response
    try{ 
        console.log(req.body);
        // use model and find  
        let response = await usersModel.find({email:req.body.email,password:req.body.password});
        console.log(response);        
        res.send(response);       
    }
    catch(err){
        console.log(err);
        res.status(500).send(err)
    }
});


  allroutes.post('/addenquiry',upload.none(),async (req,res) =>{
    //get all details and store in db
    try{ 
        console.log(req.body);
        // use model and save to back end
        let newEnquiry = new enquiriesModel(req.body)
        let enquirySavedFromDB = await newEnquiry.save();
        console.log(enquirySavedFromDB);
        res.send(enquirySavedFromDB);
    }
    catch(err){
        console.log(" error while adding enquiry.");
        console.log(err);
        res.status(500).send(err)
    }
});


allroutes.get('/enquiries',async (req,res) => {
    console.log(" reached /enquiries");
    try{
        let enquiries = await enquiriesModel.find({});
        res.send(enquiries);
    }
    catch(err){
        console.log(err);
        res.status(500).send(" error while fetching enquiries");
    }
    
});

allroutes.post('/create-payment-intent',upload.none(),async (req, res) => {
    console.log(req.body);
    const { mamount } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
        amount:mamount,
        currency: 'usd',
    });
    //res.json({ clientSecret: paymentIntent.client_secret });
    res.status(200).send({ clientSecret: paymentIntent.client_secret });
});

module.exports = allroutes;