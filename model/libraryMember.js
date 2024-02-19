const mongoose = require('mongoose');
const { Schema } = mongoose

// Schema
const LibraryMember = new Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  sex: {
    type: String,
    required: true,
  },
  birthDate: {
    type: Date,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  }
})

module.exports = mongoose.model( 'libraryMember', LibraryMember)