package bd.iqbalshahed.billingsoftware.repository;

import bd.iqbalshahed.billingsoftware.entity.OrderEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.domain.Pageable;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface OrderEntityRepository extends JpaRepository<OrderEntity, Long> {

    Optional<OrderEntity> findByOrderId(String orderId);
    List<OrderEntity> findAllByOrderByCreatedAtDesc();

    @Query("SELECT SUM(o.grandTotal) FROM OrderEntity o " +
            "WHERE o.createdAt BETWEEN :startOfDay AND :endOfDay")
    Double sumSalesbyDate(@Param("startOfDay") LocalDateTime startOfDay,
                          @Param("endOfDay") LocalDateTime endOfDay);

    @Query("SELECT COUNT(o) FROM OrderEntity o " +
            "WHERE o.createdAt BETWEEN :startOfDay AND :endOfDay")
    Long countByOrderDate(@Param("startOfDay") LocalDateTime startOfDay,
                          @Param("endOfDay") LocalDateTime endOfDay);

    @Query("SELECT o FROM OrderEntity o " +
            "WHERE o.createdAt BETWEEN :startOfDay AND :endOfDay " +
            "ORDER BY o.createdAt DESC")
    List<OrderEntity> findTodayRecentOrders(@Param("startOfDay") LocalDateTime startOfDay,
                                            @Param("endOfDay") LocalDateTime endOfDay,
                                            Pageable pageable);
}
