package bd.iqbalshahed.billingsoftware.repository;

import bd.iqbalshahed.billingsoftware.entity.ItemEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ItemRepository extends JpaRepository<ItemEntity, Long> {

    Optional<ItemEntity> findByItemId(String id);
    Integer countByCategoryId(Long id);
}
