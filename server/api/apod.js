const axios = require('axios')

const apod = axios.create({
  baseURL: `https://api.nasa.gov/planetary/`
});

module.exports = apod