
CREATE KEYSPACE IF NOT EXISTS product WITH REPLICATION = { 'class' : 'SimpleStrategy', 'replication_factor' : 1 };

CREATE TABLE IF NOT EXISTS product.customers (
  id uuid PRIMARY KEY,
  province varchar,
  city varchar,
  FirstName varchar,
  LastName varchar,
  Address varchar,
  postalcode varchar
);

CREATE TABLE IF NOT EXISTS  product.orders (
  id uuid PRIMARY KEY,
  productId varchar,
  customerId varchar,
  productQuantity varchar,
  productCategory varchar,
);

CREATE TABLE IF NOT EXISTS product.inventory (
  id uuid PRIMARY KEY,
  pname varchar,
  pprice varchar,
  ptype varchar
);



CREATE TABLE IF NOT EXISTS product.customers (
  id uuid PRIMARY KEY,
  province varchar,
  city varchar,
  FirstName varchar,
  LastName varchar,
  Address varchar,
  postalcode varchar
);

INSERT INTO product.customers(
    id, province, city, FirstName,
    LastName, Address, postalcode
  )
VALUES( now(),'ON','Toronto','Zak','Hassan','90 Eglinton Avenue East Suite 502 Toronto, ON, M4P2Y3','M4P2Y3' );
