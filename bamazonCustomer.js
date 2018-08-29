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
    console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++");
    console.log("        WELCOME, WEARY TRAVELER, TO MY SHOP        ");
    console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++");
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
  inquirer.prompt([
      {
          name: "item",
          type: "input",
          message: "Looking to protect yourself? Or deal some damage? Enter the item number of your choice.",
          validate: function(val) {
            return !isNaN(val);
          }
      }
    ])
    .then(function(val) {
    var itemId = parseInt(val.item);
    var product = checkInventory(itemId, inventory);
// check to see if item id exists in table
if (product) {
  saleQuantity(product);
}
else {
  console.log("\nI'm sorry, I don't believe I have that today. Maybe something else?");
  console.log("\n===================================================================");
  showTable();
}
});
}

// check inventory
function checkInventory(itemId, inventory) {
  for (var i = 0; i < inventory.length; i++) {
    if (inventory[i].item_id === itemId) {
      // If a matching product is found, return the product
      return inventory[i];
    }
  }
  // Otherwise return null
  return null;
}

// prompt customer for quantity
function saleQuantity(product) {
  inquirer.prompt([
      {
          name: "quantity",
          type: "input",
    message: "How many would you like?",
    validate: function(val) {
      return val > 0;
    }
  }
    ])
    .then(function(val) {
      var quantity = parseInt(val.quantity);

// check to see if quantity entered is valid
if (quantity > product.stock_quantity) {
  console.log("\nI'm sorry, I don't have that many. Maybe another time.");
  console.log("\n======================================================");
  showTable();
}
 // otherwise finish sale
else {
  finishSale(product, quantity);
}
});
}

// complete sale
function finishSale(product, quantity) {
  connection.query(
    "UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?",
    [quantity, product.item_id],
    function(err, res) {
      // Let the user know the purchase was successful
      console.log("\nYou have purchased " + quantity + " " + product.product_name + "s.");
      console.log("\n==================================================================");
      // give customer option to end sale or continue with another purchase
      promptContinue();
    }
  );
}

// give customer option to make another purchase or exit
function promptContinue(choice) {
    inquirer.prompt([
        {
          type: "input",
          name: "option",
          message: "Would you like to make another purchase? Remember, I'll give you the best deals! [Press 'Y' to continue or 'N' to exit.]",
          validate: function(val) {
            return val.toLowerCase() === "y" || val.toLowerCase() === "n";
          }
        }
      ])
      .then(function(val) {
        userOption(val.option);
      });
    }

  function userOption(choice){
  if (choice.toLowerCase() === "n") {
    // Log a message and exit the current node process
    console.log("Farewell, traveler!");
    process.exit(0);
  }
  else {
    showTable();
  }
}