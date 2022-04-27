// Entry point to intialize database, collection, and initial users
// This will only run if an existing (persistent) volume is not found 
// and you are rebuilding the containter
// Uncomment if not desired and define db, collections, and users through CLI or mongodb api

// Creating a new database matching the name within the .env 
db = db.getSiblingDB('myDB');
db.createCollection('col');

db.col.insert(
  {
    usr: 'username',
    pwd: 'not-so-secret-password',
    desc: 'Hello, this is the sample user data for testing. Think about creating a separate collection for password encryption.',
    img: 'selfie.png',
  }
);

// Creating a new user corresponding to the .env credentials
db.createUser({
  user: "username",
  pwd: "strong_password",
  roles : [ {role: 'readWrite',db: 'myDB'}]})  