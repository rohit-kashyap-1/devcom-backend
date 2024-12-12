const mongoose  = require('mongoose')
const bcrypt = require('bcrypt');
const adminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true},
  password: { type: String, required: true},
  type: { type: String, required: true}
});
adminSchema.methods.matchPassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;
