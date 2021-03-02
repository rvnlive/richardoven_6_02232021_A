// MongoDB object modeling tool
const mongoose = require('mongoose')

// Adds validation for unique fields within a Mongoose schema (unique: true)
const validator = require('mongoose-unique-validator')

// Database (User) model
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
})

userSchema.plugin(validator)
module.exports = mongoose.model('User', userSchema)
