//usuarios voluntarios
const { Schema, model } = require("mongoose");

const bcrypt = require("bcryptjs");

const UserSchema = new Schema({
  name: { type: String, required: true },
  age: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  security_val: { type: Boolean, required: false },
  password: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

UserSchema.methods.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = bcrypt.hash(password,salt);
  return hash;
};

UserSchema.methods.matchPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = model("User", UserSchema);
