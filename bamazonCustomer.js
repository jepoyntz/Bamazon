//dependencies
var mysql = require("mysql");
var inquirer = require("inquirer");

//make a connection with SQL DB
var connection = mysql.createConnection({
    host:"localhost",
    port:"3306",
    user:"root",
    password:"riley272",   
    database:"bamazonDB"
})

//initialize connection
connection.connect(function(err){
    if (err) throw err;
    console.log("connected");
})

//showTable()

//userPrompt()
inquirer.prompt({
    type:"input",
    name:"choice",
    message:"What is id number of item you wish to purchase?",
}).then(function(answer){

}) 



inquirer.prompt({
    type:"input",
    name:"quantity",
    message:"How many units do you wish to buy?",
}).then(function(value){
    
})