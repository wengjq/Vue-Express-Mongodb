const mongoose = require('mongoose')

const movieSchema = mongoose.Schema(
  {
  	title: {
    	type: String, 
   		required : true 
   	},
    poster: String,
    rating: String,
    introduction: String,
    created_time: {
   	 	type: Date, 
   	 	default: Date.now 
   	},
    update_time: { 
    	type: Date, 
    	default: Date.now
    }
  },
  {
    collection: 'movie' // 这里最好把连接（表）写清楚，mongoose 会自动给表名加 s ...
  }
)

const Movie = module.exports = mongoose.model('Movie', movieSchema)