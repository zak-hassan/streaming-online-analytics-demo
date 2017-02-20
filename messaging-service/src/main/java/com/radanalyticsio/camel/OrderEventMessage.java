package com.radanalyticsio.camel;

/**
 * Created by zhassan on 2017-02-20.
 */
public class OrderEventMessage {
     OrderEvent event;
     Order order;

    public OrderEventMessage(OrderEvent event, Order order) {
        this.event = event;
        this.order = order;
    }

    public OrderEvent getEvent() {
        return event;
    }

    public void setEvent(OrderEvent event) {
        this.event = event;
    }

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }
}
