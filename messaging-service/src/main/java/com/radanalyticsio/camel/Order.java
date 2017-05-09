package com.radanalyticsio.camel;

import com.fasterxml.jackson.annotation.JsonProperty;

import org.mongojack.ObjectId;

/**
 * Created by zhassan on 14/02/17.
 */
public class Order    {

    private static final long serialVersionUID = 2105061907470199595L;
    private String id;
    @ObjectId
    @JsonProperty("_id")
    public String getId() {
        return id;
    }
    @ObjectId
    @JsonProperty("_id")
    public void setId(String id) {
        this.id = id;
    }
    String productName;
    double productPrice;
    int productCategory;
    int productQuantity;

    public Order(){

    }

    public Order(String productName, double productPrice, int productCategory, int productQuantity) {
        this.productName = productName;
        this.productPrice = productPrice;
        this.productCategory = productCategory;
        this.productQuantity = productQuantity;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public double getProductPrice() {
        return productPrice;
    }

    public void setProductPrice(double productPrice) {
        this.productPrice = productPrice;
    }

    public int getProductCategory() {
        return productCategory;
    }

    public void setProductCategory(int productCategory) {
        this.productCategory = productCategory;
    }

    public int getProductQuantity() {
        return productQuantity;
    }

    public void setProductQuantity(int productQuantity) {
        this.productQuantity = productQuantity;
    }

    @Override
    public String toString() {
        return "Order{" +
                "productName='" + productName + '\'' +
                ", productPrice=" + productPrice +
                ", productCategory=" + productCategory +
                ", productQuantity=" + productQuantity +
                '}';
    }
}