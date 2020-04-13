const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { mongourl } = require('./config/keys');
const Contact = require('./models/Contact');
mongoose.connect(mongourl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useFindAndModify', false);

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// get reference to database
var db = mongoose.connection;
 
db.on('error', console.error.bind(console, 'connection error:'));
 
db.once('open', function() {
  console.log("Connection Successful!");
  
  // a document instance
  // var contact1 = new Contact({ name: 'Bubu', email: 'bubu@koko.de', number: '(666) 666-6666' });

  // // save model to database
  // contact1.save(function (err, contact) {
  //   if (err) return console.error(err);
  //   console.log(contact.name + " saved to contactlist collection.");
  // });  
}); 

app.get('/contactlist', (req, res) => {
  console.log('I recieaved the GET request');
  // person1 = {
  //   name: 'Mariam',
  //   email: 'mariam@nahapet.de',
  //   number: '(111) 111-1111'
  // };

  // person2 = {
  //   name: 'Armen',
  //   email: 'armen@mkrtich.de',
  //   number: '(222) 222-2222'
  // };

  // person3 = {
  //   name: 'Elina',
  //   email: 'elina@micky.de',
  //   number: '(333) 333-3333'
  // };

  // person4 = {
  //   name: 'Hayk',
  //   email: 'hay@kola.de',
  //   number: '(444) 444-4444'
  // };

  // person5 = {
  //   name: 'Nika',
  //   email: 'ni@koloz.de',
  //   number: '(555) 555-5555'
  // };

  // const contactList = [person1, person2, person3, person4, person5];
  Contact.find(function(err, contacts) {
    if (err)
      console.log(err)
    else {
      // console.log(contacts);
      res.json(contacts);
    }    
  });
});

app.post('/contactlist', (req, res) => {
  console.log(req.body);
  // a document instance
  let contact = new Contact(req.body);

  // save model to database
  contact.save((err, contact) => {
    if (err)
      return console.error(err);
    console.log(contact.name + " saved to contactlist collection.");
    res.json(contact);
  });  
});

app.delete('/contactlist/:id', async (req, res) => {
  console.log(req.params.id);
  try {
    const deletedContact = await Contact.deleteOne({ _id: req.params.id });
    console.log(deletedContact);
  } catch (err) {
    console.log(err);
  }
})

app.get('/contactlist/:id', async (req, res) => {
  console.log(req.params.id);
  try {
    const contact = await Contact.findById({ _id: req.params.id });
    res.json(contact);
  } catch (err) {
    console.log(err);
  }
});

app.put('/contactlist/:id', async (req, res) => {
  console.log(req.params.id);
  console.log('server:put:req.body', req.body);
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, { 
      name: req.body.name,
      email: req.body.email,
      number: req.body.number 
    });
    res.json(contact);
  } catch (err) {
    console.log(err);
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
})