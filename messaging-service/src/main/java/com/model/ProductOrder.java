package com.model;

import com.datastax.driver.core.Row;

import org.joda.time.DateTime;

import java.util.Date;

/**
 * Created by zhassan on 2017-05-04.
 */
public class ProductOrder implements Mapper {

    String id;
    Date created;
    String customerId;
    String productId;
    int productQuantity;
    //id         | created  | customerid  | productid          | productquantity

    @Override
    public String toString() {
        return "ProductOrder{" +
                "id='" + id + '\'' +
                ", created=" + created +
                ", customerId='" + customerId + '\'' +
                ", productId='" + productId + '\'' +
                ", productQuantity=" + productQuantity +
                '}';
    }

    public void map(Row row) {
        // TODO: Add code to row into java pojo
        id= row.getUUID("id").toString();
        created= row.getTimestamp("created");
        productId= row.getUUID("productid").toString();
        productQuantity=row.getInt("productquantity");
        customerId= row.getUUID("customerid").toString();

    }
    public ProductOrder(){}

    public ProductOrder(Row row){
        map(row);
    }

    public ProductOrder(String customerId, String productId, int productQuantity) {
        this.customerId = customerId;
        this.productId = productId;
        this.productQuantity = productQuantity;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }


    public Date getCreated() {
        return created;
    }

    public void setCreated(Date created) {
        this.created = created;
    }

    public String getCustomerId() {
        return customerId;
    }

    public void setCustomerId(String customerId) {
        this.customerId = customerId;
    }

    public String getProductId() {
        return productId;
    }

    public void setProductId(String productId) {
        this.productId = productId;
    }

    public int getProductQuantity() {
        return productQuantity;
    }

    public void setProductQuantity(int productQuantity) {
        this.productQuantity = productQuantity;
    }

}
