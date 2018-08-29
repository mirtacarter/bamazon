CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  item_id INT AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT(10) NOT NULL,
  primary key(item_id)
);

SELECT * FROM products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Fur-Lined Boots", "Clothing", 25, 42),
("Elixir of Strength", "Potions", 106, 12),
("Draught of Alteration", "Potions", 467, 7),
("Skirmisher's Philter", "Potions", 96, 36),
("Forsworn Headdress", "Armor", 50, 19),
("Stormcloack Helmet", "Armor", 12, 56),
("Helm of Yngol", "Armor", 565, 1),
("Mage's Circlet", "Jewelry", 320, 4),
("Asgeir's Wedding Band", "Jewelry", 100, 1),
("Spiced Wine", "Food", 25, 300);