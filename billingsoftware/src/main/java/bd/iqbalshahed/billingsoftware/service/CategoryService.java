package bd.iqbalshahed.billingsoftware.service;

import bd.iqbalshahed.billingsoftware.io.CategoryRequest;
import bd.iqbalshahed.billingsoftware.io.CategoryResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface CategoryService {

    CategoryResponse add(CategoryRequest request, MultipartFile file);
    List<CategoryResponse> read();
    void delete(String categoryId);
}
