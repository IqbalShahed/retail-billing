package bd.iqbalshahed.billingsoftware.service;

import bd.iqbalshahed.billingsoftware.io.OrderRequest;
import bd.iqbalshahed.billingsoftware.io.OrderResponse;

import java.util.List;

public interface OrderService {
    OrderResponse createOrder(OrderRequest request);

    void deleteOrder(String orderId);

    List<OrderResponse> getOrders();
}
