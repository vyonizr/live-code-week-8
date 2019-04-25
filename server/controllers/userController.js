const { User } = require("../models")
const { bcrypt, jwt } = require("../helpers")
const apod = require("../api/apod")

class UserController {
  static getAllUsers(req, res) {
    User.find({
      email: {
        $ne: req.authenticatedUser.email
      }
    }, "_id name")
    .then(users => {
      res.status(200).json(users)
    })
    .catch(err => {
      res.status(500).json(err)
    })
  }

  static userLogin(req, res) {
    User.findOne({
      email: req.body.email
    })
    .then(foundUser => {
      if (!foundUser) {
        res.status(401).json({
          errors: {
            password:"Wrong username/password"
          }
        })
      }
      else if (bcrypt.compareSync(req.body.password, foundUser.password)) {
        const accessToken = jwt.sign({
          id: foundUser._id,
          email: foundUser.email
        })

        res.status(200).json({
          accessToken
        })
      }
      else {
        res.status(401).json({
          errors: {
            password:"Wrong username/password"
          }
        })
      }
    })
    .catch(err => {
      if (err.errors) {
        let objError = {}
        if (err.errors.email) {
          objError.email = err.errors.email.message
        }
        if (err.errors.password) {
          objError.password = err.errors.password.message
        }
        res.status(400).json({
          errors: objError
        })
      }
      else {
        console.log(err);
        res.status(500).json(err)
      }
    })
  }

  static userRegister(req, res) {
    console.log(req.body);
    User.create({
      email: req.body.email,
      password: req.body.password
    })
    .then(createdUser => {
      res.status(201).json(createdUser)
    })
    .catch(err => {
      if (err.errors) {
        let objError = {}
        if (err.errors.email) {
          objError.email = err.errors.email.message
        }
        if (err.errors.password) {
          objError.password = err.errors.password.message
        }
        res.status(400).json({
          errors: objError
        })
      }
      else {
        res.status(500).json(err)
      }
    })
  }
}

module.exports = UserController