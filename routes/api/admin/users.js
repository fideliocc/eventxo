const express = require('express')
const router = express.Router()
const jwt = require("jsonwebtoken")
const keys = require('../../../config/keys')
const passport = require("passport");

// Load input validation
const validateRegisterInput = require("../../../validation/register");
const validateLoginInput = require("../../../validation/login");
const validateEditUserInput = require("../../../validation/edit-user")

// bcrypt for password hash
const bcrypt = require("bcryptjs")

/*** LOAD MODELS ***/
const AdminUser = require("../../../models/AdminUser")
const AdminProfile = require("../../../models/AdminProfile")
/******************/

// @route   POST api/admin/users/register
// @desc    Register an user
// @access  Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  AdminUser.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Este usuario está registrado" });
    } else {
      // Creating the user
      const newUser = new AdminUser({
        name: req.body.name,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        country: req.body.country
      });

      // Hashing the password with bcrypt
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => {
              const handle = (req.body.name).toLowerCase()
              const newProfile = new AdminProfile({
                handle: handle,
                user: user._id
              });
              newProfile.save().then(profile => res.json(profile))
              .catch(err => console.log(err))
            })
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route   POST api/admin/users/login
// @desc    Login user / Returning JWT Token
// @access  Public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;
  const day = 86400;  // seconds in a day
  // Find user by email
  AdminUser.findOne({ email: email }).then(user => {
    // Check for user
    if (!user) {
      return res.status(404).json({ email: "Usuario no registrado" });
    } else {
      // Check Password
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          // User matched, create JWT payload
          const payload = { id: user.id, name: user.name };

          // Sign Token
          jwt.sign(
            payload,
            keys.secretOrKey,
            { expiresIn: day },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token
              });
            }
          );
        } else {
          return res.status(400).json({ password: "Contraseña incorrecta" });
        }
      });
    }
  });
});

// @route   POST api/admin/users/editpassword
// @desc    Edit password
// @access  Private

router.post('/editpassword', passport.authenticate("jwt-admin", { session: false }), (req, res) => {
  const { errors, isValid } = validateEditUserInput(req.body);
    // Check Validation
    if (!isValid) {
    // If any errors send 400 with errors object
    return res.status(400).json(errors);
    }
  // If is valid go to find the user
  AdminUser.findOne({ _id: req.user.id }).then(user => {
    // Check Password if is correct
    const password = req.body.currentpassword
    const newpassword = req.body.newpassword
    
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // Hash the new password (if is Validated)
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newpassword, salt, (err, hash) => {
            if (err) throw err;
            newHashedPassword = hash;

            User.findOneAndUpdate(
              { _id: req.user.id },
              { $set: { password: newHashedPassword }},
              { new: true }
            ).then(user => res.json(user))
            .catch(err => res.status(400).json(err))
          })
        })
      } else {
        return res.status(400).json({ password: "Contraseña incorrecta" });
      }
    })
  .catch(err => res.status(400).json(err))
  })
})

// @route   GET api/admin/users/current
// @desc    Return current user
// @access  Private
router.get(
  "/current",
  passport.authenticate("jwt-admin", { session: false }),
  (req, res) => {
    // res.json({ msg: "Success!" });
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

module.exports = router
