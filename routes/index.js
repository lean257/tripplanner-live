const router = require('express').Router()
const db = require('../models')

const Restaurant = db.models.restaurant
const Activity = db.models.activity
const Hotel = db.models.hotel
const Place = db.models.place

router.get('/', function(req, res, next){

	const findingHotels = Hotel.findAll({include: [Place]})
	const findingRestaurants = Restaurant.findAll({include: [Place]})
	const findingActivities = Activity.findAll({include: [Place]})

	Promise.all([findingHotels, findingActivities, findingRestaurants])
		.then(function(arr){
			res.render('index', {
				hotels: arr[0],
				activities: arr[1],
				restaurants: arr[2]
			})
		})

})

module.exports = router
