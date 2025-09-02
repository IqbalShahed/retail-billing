package bd.iqbalshahed.billingsoftware.service.impl;

import bd.iqbalshahed.billingsoftware.entity.CategoryEntity;
import bd.iqbalshahed.billingsoftware.io.CategoryRequest;
import bd.iqbalshahed.billingsoftware.io.CategoryResponse;
import bd.iqbalshahed.billingsoftware.repository.CategoryRepository;
import bd.iqbalshahed.billingsoftware.service.CategoryService;
import bd.iqbalshahed.billingsoftware.service.CloudinaryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;
    private final CloudinaryService cloudinaryService;

    @Override
    public CategoryResponse add(CategoryRequest request, MultipartFile file){
        String imgUrl;
        try{
            imgUrl = cloudinaryService.uploadFile(file);
        } catch (IOException e){
            throw new RuntimeException("Failed to upload file to Cloudinary", e);
        }
        CategoryEntity newCategory = convertToEntity(request);
        newCategory.setImgUrl(imgUrl);
        newCategory = categoryRepository.save(newCategory);
        return convertToResponse(newCategory);
    }

    @Override
    public List<CategoryResponse> read() {
        return categoryRepository.findAll()
                .stream()
                .map(categoryEntity -> convertToResponse(categoryEntity))
                .collect(Collectors.toList());
    }

    @Override
    public void delete(String categoryId) {
        CategoryEntity existingCategory = categoryRepository.findByCategoryId(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found! "));
        cloudinaryService.deleteFile(existingCategory.getImgUrl());
        categoryRepository.delete(existingCategory);
    }

    private CategoryEntity convertToEntity(CategoryRequest request){
        return CategoryEntity.builder()
                .categoryId(UUID.randomUUID().toString())
                .name(request.getName())
                .description(request.getDescription())
                .bgColor(request.getBgColor())
                .build();
    }

    private CategoryResponse convertToResponse(CategoryEntity newCategory) {
        return CategoryResponse.builder()
                .categoryId(newCategory.getCategoryId())
                .name(newCategory.getName())
                .description(newCategory.getDescription())
                .bgColor(newCategory.getBgColor())
                .imgUrl(newCategory.getImgUrl())
                .createdAt(newCategory.getCreateAt())
                .updatedAt(newCategory.getUpdateAt())
                .build();
    }

}
