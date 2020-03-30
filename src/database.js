const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost/HacemeUnParo-App',{

useNewUrlParser: true,
useUnifiedTopology: true,
useCreateIndex: true,
useNewUrlParser: true,
useFindAndModify: false


})

  .then(db => console.log('La base de datos está conectada'))
  .catch(err => console.log(err));