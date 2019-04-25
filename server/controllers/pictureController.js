const { User, Picture } = require("../models")
const apod = require("../api/apod")

class PictureController {
  static getAllPictures (req, res) {
    // 22 April 2018
    Picture.find({
      userId: req.authenticatedUser.id
    })
    .select("_id title url mediaType")
    .then(foundPictures => {
      res.status(200).json(foundPictures)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err)
    })
  }

  static getAPicture(req, res) {
    Picture.findById(req.params.id)
    .then(foundPicture => {
      res.status(200).json(foundPicture)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err)
    })
  }

  static createAPicture (req, res) {
    let picture = null
    let createdPicture = null
    apod.get(`apod?api_key=${process.env.APOD_API_KEY}&date=${req.body.date}`)
    .then(({ data }) => {
      picture = data
      return Picture.find({
        pictureDetails: {
          userId: req.authenticatedUser.id,
          date: "2017-05-07"
        }
      })
    })
    .then(foundPicture => {
      if(!foundPicture) {
        res.send(400).json({
          message: "You have got this picture"
        })
      }
      else {
        return Picture.create({
          date: picture.date,
          title: picture.title,
          desc: picture.explanation,
          url: picture.url,
          mediaType: picture.media_type,
          userId: req.authenticatedUser.id
        })
      }
    })
    .then(createdPicture => {
      return User.findByIdAndUpdate(req.authenticatedUser.id, {
        $push: {
          pictures: createdPicture._id
        }
      }, { new: true })
    })
    .then(updatedUser => {
      res.status(201).json(createdPicture)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err)
    })
  }

  static deleteAPicture(req, res) {
    User.findByIdAndUpdate(req.authenticatedUser.id, {
      $pull: {
        pictures: req.params.pictureId
      }
    })
    .then(() => {
      return Picture.findByIdAndDelete(req.params.pictureId)
    })
    .then(() => {
      res.status(200).json({
        message: "Picture has been removed"
      })
    })
    .catch(err => {
      console.log(err);
    })
  }
}

module.exports = PictureController