const pkg = require('./package')
const express = require('express')
const config = require('./config/db')
const bodyParser = require('body-parser')
const app = express()
const mongoose = require('mongoose')
const index = require('./router/index')
const movie = require('./router/movie')

mongoose.connect(config.mongodb, {
	useMongoClient: true
})
mongoose.Promise = global.Promise

const port = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('dist'))
app.use('/', index)
app.use('/api', movie)


app.listen(port, () => {
  console.log(`${pkg.name} listening on port ${port}`)
})

module.exports = app