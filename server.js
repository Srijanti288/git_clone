const express = require('express');
const app = express();
const db = require('./db');
require('dotenv').config();
const passport = require('./auth');

const bodyParser = require('body-parser');
app.use(bodyParser.json()); // store data in req.body
const PORT = process.env.PORT || 3000;


// Middleware Function
const logRequest = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] Method used: [${req.method}] Request made to: [${req.originalUrl}]`);
    next(); // Move on to the next phase
}
app.use(logRequest);

app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local', {session: false});

app.get('/', (req, res) => {
    res.send('Welcome to my hotel.');
})

// Import the router files
const PersonRoutes = require('./routes/PersonRoutes');
const MenuItemRoutes = require('./routes/MenuItemRoutes');

// Use the router
app.use('/person', PersonRoutes);
app.use('/menu', MenuItemRoutes);


app.listen(PORT, () => {
    console.log('Server is running on port 3000')
});


































/*1.  function add(a,b){
    return a+ b;
}
let result = add(5,5);
 console.log("the result is: " + result)*/
/*2.  let add = function(a,b){
    return a + b;
}
let result = add(5,11);
console.log("the result is: " + result);
*/
/*3.  (function(a,b){
    console.log("srijanti");
    
})(); */
/*4. Arrow Function
 let add = (a,b)=>{return a + b}
let result = add(5,1);
console.log("the result is: " + result); */
/*5. Callback Function
function callback (){
    console.log("adding successfully completed");
}
const add  = function (a,b,callback){
    let result = a + b;
    console.log("result: " + result);    //main function work complete
    callback();
}
add(5,5,callback); */
/*6. Callback Function 2nd type
const add = function (a, b, callback) {
    let result = a + b;
    console.log("result: " + result); //main function work complete
    callback();
}
add(5, 50, () => {
    console.log("adding successfully completed");
})*/

/* fs, os module of nodejs
var fs = require('fs');
var os = require('os');

var user = os.userInfo();
console.log(user);
console.log(user.username);

fs.appendFile("greeting.txt", "Hi" + user.username + "\n", () => {
    console.log("File written");
});*/

/* lodash 
var _ = require('lodash');

let data = ["person", "person", 1,5,1,1,15,4];
let filter = _.uniq(data);
console.log(filter);
console.log(_.isString("Srijanti"));*/

/*  ---- import file -->  const notes = require('./notes.js');
// use this file statement in this way -------
 var age = notes.age;
let result = notes.addNumber(age, 2);
console.log(result);
console.log(age);*/

/* // convert json string to object
const jsonString = '{"name":"srijanti","age" :22,"city":"goghat"}';
const jsonObject = JSON.parse(jsonString); 
console.log(jsonObject);
console.log(typeof jsonObject);

//convert object ti json String
const jsonStringified = JSON.stringify(jsonObject); 
console.log(jsonStringified);
console.log(typeof jsonString); */