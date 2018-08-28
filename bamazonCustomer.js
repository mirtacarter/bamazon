// require packages
var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");

// create connection to database
var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "root",
    database: "bamazon"
  });


// connect to mysql server and database
connection.connect(function(err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    console.log("Welcome, weary traveler, to my shop. What would you like to purchase?");
    showTable();
  });

  // function to display table of products from db in console
function showTable() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
       console.table(res);

    // call sale function
    startSale(res);
  });
}

// sale functions
// prompt customer for item id
function startSale(inventory) {
  // 
  inquirer.prompt([
      {
          name: "item_no",
          type: "input",
          message: "Please enter the item number of the product you would like to purchase",
      }
    ]);

// check to see if item id exists in table
if (product) {
  saleQuantity(product);
}
else {
  console.log("\nThat item does not exist.");
  showTable();
}
}



// prompt customer for quantity



// check to see if quantity entered is valid


// complete purchase


// update inventory


// give customer option to make another purchase or exit














