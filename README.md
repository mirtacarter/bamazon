# Bamazon - Node.js & MySQL

## Overview

Bamazon is an Amazon-like storefront utilizing Node.js and MySQL. The app takes in orders from customers and depletes stock from the store's inventory.

NPM Packages used:
   * MySQL

   * Inquirer

   * Console-table

### Customer View

Store inventory data was accessed via a MySQL Database called `bamazon`, where products and their characteristics were stored in a table called `products`. This table contained the following columns:

   * item_id (unique id for each product)

   * product_name (Name of product)

   * department_name

   * price (cost to customer)

   * stock_quantity (how much of the product is available in stores)

Mock product data was inserted into this database for a number of different products, which would be accessed in the Node application.

![Alt Text](http://g.recordit.co/CWtz9VToml.gif)

Running the Node application `bamazonCustomer.js` displays all of the items available for sale, including the ids, names, and prices of products for sale. The customer is presented with two prompts:
   * The first asks them the ID of the product they would like to buy.

![Alt Text](http://g.recordit.co/XcJAfzRVVi.gif)


   * The second message asks how many units of the product they would like to buy.

   ![Alt Text](http://g.recordit.co/5MrDGIY5zW.gif)

Once the customer has placed the order, the application checks if the store has enough of the product to meet the customer's request.

   * If not, the app alerts the customer with a message indicating there is insufficient quantity to complete their order, prevents the order from going through, and reloads the product table.

   ![Alt Text](http://g.recordit.co/SUb13bQPK9.gif)

If there is sufficient inventory of the product, however, the order is fulfilled, and the database is updated to reflect the remaining quantity. Additionally, the customer is then given the option to continue with another purchase, or exit the application.

   ![Alt Text](http://g.recordit.co/1dtSC5kn6q.gif)
