'use strict';

module.exports = require('lib/wiring/routes')

// create routes

// what to run for `GET /`
.root('root#root')

// standards RESTful routes
.resources('examples')

//review routes
.resources('reviews')

//rentals routes
.resources('rentals')

//index for personal rentals
.get('/myrentals', 'rentals#indexMyRentals')

//index for reviews
.get('/myreviews', 'reviews#indexMyReviews')

// users of the app have special requirements
.post('/sign-up', 'users#signup')
.post('/sign-in', 'users#signin')
.delete('/sign-out/:id', 'users#signout')
.patch('/change-password/:id', 'users#changepw')
.resources('users', { only: ['index', 'show'] })

// all routes created
;
