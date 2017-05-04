package com.model;

import com.datastax.driver.core.Row;

/**
 * Created by zhassan on 2017-05-04.
 */
public class Inventory  implements Mapper {

    // id                                   | pname  | pprice | ptype
    String id;
    String pname;
    String pprice;
    String ptype;

    public void map(Row row) {

    }
}
