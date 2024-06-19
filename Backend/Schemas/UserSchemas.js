const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  Name: {
    type: String,
    required: true
  },
  Email: {
    type: String,
    required: true,
    unique: true
  },
  Password: {
    type: String,
    required: true
  },
  PhoneNumber:{
    type: String,
    required:true
  }
});

module.exports=mongoose.model('user',UserSchema)