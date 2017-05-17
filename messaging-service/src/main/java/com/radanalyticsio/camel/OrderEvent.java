package com.radanalyticsio.camel;

import java.io.Serializable;

/**
 * Created by zhassan on 2017-02-20.
 */
public enum OrderEvent implements Serializable {
    ADD_ORDER,
    UPDATE_ORDER,
    DELETE_ORDER,
    GET_ORDER;




}
