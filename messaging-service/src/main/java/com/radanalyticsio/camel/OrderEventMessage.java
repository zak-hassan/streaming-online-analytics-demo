package com.radanalyticsio.camel;

import com.model.ProductOrder;

import java.io.Serializable;

/**
 * Created by zhassan on 2017-02-20.
 */
public class OrderEventMessage implements Serializable {
     OrderEvent event;
     ProductOrder order;

    public OrderEventMessage(){

    }

    public OrderEventMessage(OrderEvent event, ProductOrder order) {
        this.event = event;
        this.order = order;
    }

    public OrderEvent getEvent() {
        return event;
    }

    public void setEvent(OrderEvent event) {
        this.event = event;
    }

    public ProductOrder getOrder() {
        return order;
    }

    public void setOrder(ProductOrder order) {
        this.order = order;
    }

    @Override
    public String toString() {
        return "OrderEventMessage{" +
                "event=" + event +
                ", order=" + order +
                '}';
    }
}
