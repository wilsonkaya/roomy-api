## ERD ##
http://imgur.com/a/vHXQo

## Deployed Site ##
https://wilsonkaya.github.io/roomy/

## Github Link Front-End ##
https://github.com/wilsonkaya/roomy

## Deployed Api ##
https://roomy-api.herokuapp.com

## Routes ##

```
Review routes
.resources('reviews')

Rentals routes
.resources('rentals')

Index for personal rentals
.get('/myrentals', 'rentals#indexMyRentals')

Index for reviews
.get('/myreviews', 'reviews#indexMyReviews')

// users of the app have special requirements
.post('/sign-up', 'users#signup')
.post('/sign-in', 'users#signin')
.delete('/sign-out/:id', 'users#signout')
.patch('/change-password/:id', 'users#changepw')
.resources('users', { only: ['index', 'show'] })
```
## Technologies ##
For this project I have decided to use Express, MongoDB and Mongoose. The reason behind that was to challenge myself because I was not feeling confident with these technologies.

## General Approach ##
After creating my wireframes and ERD, I started building my api server from models that I was planing use. The path that I follow for every route was first to create and curl request. After testing the curl request and having an error about not having the specific route or a 404 error, I created the necessary route and ran the curl request again.
After receving the third error of not having controller, I created the specific controllers that are necessary to achieve the request.

I began coding routes by starting with create, so that I could have data to test other routes. After getting the basic functioning api, I build my front-end so that I could test both of them at the same time. According to necessities of my app, I modified both my models and controllers.

## Installation instructions ##
Dependencies are installed with Npm install.


## Major hurdles ##
At the beginning of this project I did not realize that I will need a parent child relationship and I thought I would make only one table. However, I ended up coding my second table, reviews. As a child of rentals, reviews should be deleted when users delete the related rental. So I needed to find a way to make the non-sql database have relations.
I have managed to do that with:

```
rentalSchema.pre('remove', function(next) {
  Review.remove({"rentals": this._id}).exec();
  next();
})
```
