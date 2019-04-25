require("dotenv").config()

const express = require("express")
const app = express()
const mongoose = require("mongoose")
const cors = require("cors")
const port = process.env.PORT || 80
const routes = require("./routes")

mongoose.set('useFindAndModify', false);

mongoose.connect("mongodb://localhost:27017/from-nasa-with-love", { useNewUrlParser: true })

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use("/", routes)

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})
// https://api.nasa.gov/planetary/apod?api_key=YqpBZFfOv4ZKqgyZ4nEv2ArZVLm69KY5euqGRZlI&date=2017-10-10