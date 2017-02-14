package com.example.camel;


import java.util.Collection;
import java.util.Map;
import java.util.TreeMap;

/**
 * Created by zhassan on 14/02/17.
 */
public class OrderService {
    private final Map<String, Order> Orders = new TreeMap<String, Order>();

    public OrderService() {
        Orders.put("123", new Order(123, "John Doe"));
        Orders.put("456", new Order(456, "Donald Duck"));
    }

    public Order getOrder(String id) {
        return Orders.get(id);
    }

    public Collection<Order> listOrders() {
        return Orders.values();
    }

    public Order updateOrder(Order Order) {
        return Orders.put("" + Order.getId(), Order);
    }
}
