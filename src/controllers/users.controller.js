const usersCtrl = {};

// Models
const User = require('../models/User');

// Modules
const passport = require("passport");

//finalizados en render son GET
//sin el prefijo render son POST

usersCtrl.renderSignUpForm = (req, res) => {
  res.render('users/signup');
};

usersCtrl.singup = async (req, res) => {
  const errors = [];
  const { name,age, email, phone , password, confirm_password } = req.body;
  console.log(req.body);
  if(name.length <=0|email.length <=0){
    errors.push({text : 'Por favor rellena todos los campos'});
  }
  if (password != confirm_password) {
    errors.push({ text: "Passwords do not match." });
  }
  if (password.length < 4) {
    errors.push({ text: "Passwords must be at least 4 characters." });
  }
  if (errors.length > 0) {
    res.render("users/signup", {
      errors,
      name,
      age,
      email,
      phone,
      password,
      confirm_password
    });
  } else {
    // Look for email coincidence
    const emailUser = await User.findOne({ email: email });
    if (emailUser) {
      req.flash("error_msg", "The Email is already in use.");
      res.redirect("/users/signup");
    } else {
      // Saving a New User
      const newUser = new User({ name,age, email, phone, password });
      newUser.password = await newUser.encryptPassword(password); 
      await newUser.save();
      req.flash("success_msg", "You are registered.");
      res.redirect("/users/signin");
    }
  }
};

usersCtrl.renderSigninForm = (req, res) => {
  res.render("users/signin");
};

usersCtrl.signin = passport.authenticate("local", {
    successRedirect: "/notes",
    failureRedirect: "/users/signin",
    failureFlash: true
  });

usersCtrl.logout = (req, res) => {
  req.logout();
  req.flash("success_msg", "You are logged out now.");
  res.redirect("/users/signin");
};

module.exports = usersCtrl;