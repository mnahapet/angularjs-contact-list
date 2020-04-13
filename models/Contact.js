const mongoose = require('mongoose');
 // define Schema
 const ContactSchema = mongoose.Schema({
  name: String,
  email: String,
  number: String
});

// compile schema to model
const Contact = mongoose.model('Contact', ContactSchema);
module.exports = Contact;