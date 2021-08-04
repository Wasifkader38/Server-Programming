const mongoose = require('mongoose');
const MOSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  category: {
    type: String,
    required: true
  },


  contact: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: false
  },

  institution: {
    type: String,
    required: true
  },

  total: {
    type: Number,
    required: true
  },

  paid: {
    type: String,
    required: true
  },

  selected: {
    type: Boolean,
    required: true
  },

  tshirt: {
    type: String,
    required: true
  },

  date: {
    type: Date,
    default: Date.now
  },

});

const mathOlympiad=mongoose.model("MathOlympiad",MOSchema);
module.exports=mathOlympiad;
