package com.radanalyticsio.camel;

import com.model.ProductOrder;

/**
 * Created by zhassan on 2017-02-20.
 */
public class OrderEventMessage {
     OrderEvent event;
     ProductOrder order;

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
}
