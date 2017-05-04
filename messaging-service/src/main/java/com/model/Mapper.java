package com.model;

import com.datastax.driver.core.Row;

/**
 * Created by zhassan on 2017-05-04.
 */
public interface Mapper {
    public void map(Row row);
}
