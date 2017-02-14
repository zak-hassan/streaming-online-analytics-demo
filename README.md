# Spark Online Analytics Store Demo

### Prerequisite

Environment:
* Kafka
* Zookeeper
* Docker
* Minio


### Building and  Running


```bash

mvn clean install
java -jar target/streaming-online-analytics-demo-1.0-SNAPSHOT-jar-with-dependencies.jar

```


Components:
1) UI :

- NodeJS web UI with form input:
- Dropdown-select -> `[ product1, product2, product3 ]`
- Button "Buy Now"
- WebSockets will send notifications when a customer comes on the site and when they disconnect.

2) MongoDB database:

- Script to create sample Collection with products:

Fields: 
```
productName, productPrice, productCategory, productQuantity
```
3) OrderPurchaseMicroService:

- Will send orders for products to kafka broker using camel.
- WebService using Camel JAX-RS from endpoint and using kafka to endpoint.

4) Spark Streaming App:

Stream all incoming messages in kafka and calculate:

- Number of customers on the website.
- Number of orders placed.
- Number of times the customer comes back to the same product page and views.
- Top viewed products.
- Top purchased products.

Will use Parquet dataformat and storing results on filesystem or s3
