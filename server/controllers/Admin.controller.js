const Admins = require("../models/Admin.model")
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');


// Read All
module.exports.getAllAdmins = (req, res) => {
  Admins.find()
    .then(allAdmins => res.json({ admins: allAdmins }))
    .catch(err => res.json({ message: 'Something went wrong', error: err }));
}

// Find One
module.exports.findoneSingleAdmin = (req, res) => {
  Admins.findOne({ _id: req.params.id })
    .then(oneSingleAdmin => res.json({ admin: oneSingleAdmin }))
    .catch(err => res.json({ message: 'Something went wrong', error: err }));
}

// Create One
module.exports.createNewAdmin = async (req, res) => {
  console.log(req.body)
  const newAdmin = new Admins(req.body);
  try {
    await newAdmin.save()
    console.log(newAdmin)
    const payload = {
      id: newAdmin._id
    }
    const adminToken = jwt.sign(payload, process.env.ADMIN_LOGIN_REG_SECRET_KEY)
    console.log(adminToken);
    res
      .cookie("adminToken", adminToken, { domain: ".motomarket.shop" })
      .json({ msg: "success!", admin: admin });
  } catch (err) {
    res.json(err)
  }
}

// variable = function for login
module.exports.adminLogin = async (req, res) => {
  console.log("1");
  console.log(req.body);
  // takes request = email + password
  const { email, password } = req.body;
  try {
    // checks if email is in the Database
    const admin = await Admins.findOne({ email: email })

    // if email is not in database send response
    if (!admin) {
      res.json('401, Invalid email or password. Please try again.')
    }

    // Check if passwords match
    const matchedPasswords = await bcrypt.compare(password, admin.password)

    // checks if password associated with email matches given password
    if (matchedPasswords) {
      // Build Response
      var payload = {
        id: admin._id
      }
    } else {
      res.json('401, Invalid email or password. Please try again.')
    }

    // create JWT
    const adminToken = jwt.sign(payload, process.env.ADMIN_LOGIN_REG_SECRET_KEY)

    res
      .cookie("adminToken", adminToken, { domain: ".motomarket.shop" })
      .json({ msg: "login succesful" })
  } catch (err) {
    console.log(err);
    // send err and error message
    res.json(err)
  }
}

module.exports.adminLogout = async (req, res) => {
  try {
    res.cookie('adminToken', '', { expires: new Date(0), httpOnly: true, sameSite: 'strict', secure: true })
    console.log("adminToken cleared");
    res
      .json({ msg: 'logout successful' })
      .sendStatus(200);
  } catch (err) {
    console.log(err);
  }
}

