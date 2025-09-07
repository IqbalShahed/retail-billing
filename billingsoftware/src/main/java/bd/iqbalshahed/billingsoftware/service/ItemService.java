package bd.iqbalshahed.billingsoftware.service;

import bd.iqbalshahed.billingsoftware.io.ItemRequest;
import bd.iqbalshahed.billingsoftware.io.ItemResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ItemService {

    ItemResponse add(ItemRequest request, MultipartFile file);
    List<ItemResponse> read();
    void delete(String itemId);
}
