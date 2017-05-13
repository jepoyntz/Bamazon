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
    //function to display table to terminal from sql db that we will call later
    displayTable();
})

//displayTable()
var displayTable = function(){
    //query to select all * items from the table, and console.lg result
    connection.query("SELECT * FROM products", function(err,res){
        for(var i=0; i<res.length; i++){
            console.log(res[i].item_id+ " || "+res[i].product_name+ " || "+res[i].department_name+ " || "+
                res[i].price+ " || "+res[i].stock_quantity+"\n");
        }
        userPrompt(res);
    })

}

//userPrompt()
//using the response from the table
var userPrompt = function(res){
    inquirer.prompt([{
        type:"input",
        name:"choice",
        message:"What is the id# for the item you wish to buy?"
    }]).then(function(answer){
        var correct = false;
        for(var i=0; i<res.length; i++){
            if(res[i].item_id==answer.choice){
                correct = true;
                var product = answer.choice;
                var id = i;
   //second prompt for # of units to buy 
               inquirer.prompt({     
                type:"input",
                name:"units",
                message:"How many units would you like to buy?",
                //make sure its a number
                validate: function(value){
                    if(isNaN(value)==false){
                        return true;
                    } else {
                        return false;
                    }
               }     
                 
            }).then(function(answer){
                if((res[id].stock_quantity-answer.units)>0){
                    console.log(answer)
                    connection.query("UPDATE products SET stock_quantity="+ (res[id].stock_quantity-answer.units)+" WHERE product_name='"+ res[id].product_name+"'", function(err,res2){

                     // +(res[id].stock_quantity-  
                        
                      // parseInt(answer.units))+" WHERE item_id="+id, function(err,res2){
                         console.log("Purchase Complete");
                         console.log(res[id].price * answer.units)
                         displayTable();
                        })              
                          } else {
                    console.log("Not a valid selection");
                    userPrompt(res);
                }
            })
         }
       }
       if(i==res.length && correct==false){
        console.log("Insufficient Quantity");
        userPrompt(res);
       }
        
    })
}
    





//inquirer.prompt({
    //type:"input",
   // name:"quantity",
   // message:"How many units do you wish to buy?",
//}).then(function(value){

//})