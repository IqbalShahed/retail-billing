package bd.iqbalshahed.billingsoftware.service;

import bd.iqbalshahed.billingsoftware.io.OrderRequest;
import bd.iqbalshahed.billingsoftware.io.OrderResponse;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.util.List;

public interface OrderService {
    OrderResponse createOrder(OrderRequest request);

    void deleteOrder(String orderId);

    List<OrderResponse> getOrders();

    Double sumSalesByDate(LocalDate date);

    Long countByOrderDate(LocalDate date);

    List<OrderResponse> findRecentOrders();
}
