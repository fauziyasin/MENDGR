// Entry point to intialize database, collection, and initial users
// This will only run if an existing (persistent) volume is not found 
// and you are rebuilding the containter
// Uncomment if not desired and define db, collections, and users through CLI or mongodb api

// Creating a new database matching the name within the .env 
db = db.getSiblingDB('myDB');
db.createCollection('sample_collection');


// Creating a new user corresponding to the .env credentials
db.createUser({
  user: "user",
  pwd: "password",
  roles : [ {role: 'readWrite',db: 'myDB'}]})  