const router = require("express").Router()
const { UserController, PictureController } = require("../controllers/")
const { isAuthenticated, isAuthorized } = require("../middlewares")

router.get("/", (req, res) => {
  res.status(200).send('connected!')
})
router.post("/login", UserController.userLogin)
router.post("/register", UserController.userRegister)

router.use(isAuthenticated)
router.get("/apods", PictureController.getAllPictures)
router.get("/apods/:id", PictureController.getAPicture)
router.post("/apods", PictureController.createAPicture)
router.delete("/apods/:pictureId", isAuthorized, PictureController.deleteAPicture)

module.exports = router