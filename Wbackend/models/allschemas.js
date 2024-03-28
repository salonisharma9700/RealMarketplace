let mongoose = require('mongoose');
let houseSchema = new mongoose.Schema(
    {
      "id": {
        "type": "Number"
      },
        "address": {
          "type": "String",
          "required": true
        },
        "locality": {
          "type": "String",
          "required": true
        },
        "bhk": {
          "type": "String",
          "required": true
        },
        "description": {
          "type": "String",
          "required": true
        },
        "price": {
          "type": "Number",
          "required": true
        },
        "photo": {
          "type": "String",
          "required": true
          //"data": "base64_encoded_image_data_here"
        }
      }
);
//user schema
// name: "", email: "", password: "", phone: ""
let userSchema = new mongoose.Schema(
{
  "name": {
    "type": "String",
    "required": true
  },
  "email": {
    "type": "String",
    "required": true,
    "unique":true
  },
  "password": {
    "type": "String",
    "required": true
  },
  "phone": {
    "type": "String",
    "required": true
  },
  "role":{
    "type": String,
    "required":true,
    "default":"buyer"
  }

}
);

//enquiry schema
// email:"",name:"",mobilenum:"",remarks:""
let enquirySchema = new mongoose.Schema(
{

  "address": {
    "type": "String",
    "required":true
  },
  "name": {
    "type": "String",
    "required":true
  },
  "email": {
    "type": "String",
    "required":true
  },
  "mobilenum": {
    "type": "String"
  },
  "remarks": {
    "type": "String",
    "required":true
  },
  "submittedDate":{
    "type": Date,
    "default": new Date()
  }
}
);


let housesModel = mongoose.model('House',houseSchema);
let usersModel = mongoose.model('User',userSchema);
let enquiriesModel = mongoose.model('Enquiry',enquirySchema);


module.exports = {housesModel,usersModel,enquiriesModel};


