const mongoose = require('mongoose')

const movieSchema = mongoose.Schema({
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
})

const Movie = module.exports = mongoose.model('movie', movieSchema)