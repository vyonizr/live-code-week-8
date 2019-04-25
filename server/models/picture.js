const mongoose = require("mongoose")
const { Schema } = mongoose

const pictureSchema = new Schema({
  date: {
    type: Date
  },
  title: {
    type: String
  },
  desc: {
    type: String
  },
  url: {
    type: String
  },
  mediaType: {
    type: String
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
})

const Picture = mongoose.model("Picture", pictureSchema)

module.exports = Picture