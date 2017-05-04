package com.model;

import com.datastax.driver.core.Row;

/**
 * Created by zhassan on 2017-05-04.
 */
public class Customer implements Mapper {
// id                                   | address                                | city      | firstname | lastname | postalcode | province
    String id;
    String address;
    String city;
    String firstname;
    String lastname;
    String postalcode;
    String province;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getPostalcode() {
        return postalcode;
    }

    public void setPostalcode(String postalcode) {
        this.postalcode = postalcode;
    }

    public String getProvince() {
        return province;
    }

    public void setProvince(String province) {
        this.province = province;
    }

    public void map(Row row) {


    }

}
