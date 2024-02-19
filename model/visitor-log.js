const mongoose = require('mongoose');
const { Schema } = mongoose

// Schema
const VisitorLog = new Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  visit: {
    type: String,
    required: true,
  }
})

module.exports = mongoose.model( 'visitorLog', VisitorLog)