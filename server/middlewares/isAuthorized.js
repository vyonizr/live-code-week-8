const { Picture } = require("../models")

module.exports = function isAuthorized(req, res, next) {
  Picture.findById(req.params.pictureId)
  .then(foundPicture => {
    if (foundPicture === null) {
      res.status(404).json({
        errors: {
          message: "Answer not found."
        }
      })
    }
    else if (foundPicture.userId.toString() !== req.authenticatedUser.id.toString()) {
      res.status(401).json({
        errors: {
          message: "You are not authorized to perform this action."
        }
      })
    }
    else {
      next()
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  })
}