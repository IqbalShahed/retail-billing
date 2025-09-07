package bd.iqbalshahed.billingsoftware.service.impl;

import bd.iqbalshahed.billingsoftware.entity.CategoryEntity;
import bd.iqbalshahed.billingsoftware.entity.ItemEntity;
import bd.iqbalshahed.billingsoftware.io.ItemRequest;
import bd.iqbalshahed.billingsoftware.io.ItemResponse;
import bd.iqbalshahed.billingsoftware.repository.CategoryRepository;
import bd.iqbalshahed.billingsoftware.repository.ItemRepository;
import bd.iqbalshahed.billingsoftware.service.CloudinaryService;
import bd.iqbalshahed.billingsoftware.service.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ItemServiceImpl implements ItemService {

    private  final CloudinaryService cloudinaryService;
    private final ItemRepository itemRepository;
    private final CategoryRepository categoryRepository;

    @Override
    public ItemResponse add(ItemRequest request, MultipartFile file) {
        String imgUrl;
        try {
            imgUrl = cloudinaryService.uploadFile(file);
        } catch (IOException e) {
            throw new RuntimeException("Failed to upload file to Cloudinary", e);
        }

        // fetch category
        CategoryEntity category = categoryRepository.findByCategoryId(request.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        ItemEntity newItem = convertToEntity(request);
        newItem.setImgUrl(imgUrl);
        newItem.setCategory(category);

        newItem = itemRepository.save(newItem);
        return convertToResponse(newItem);
    }

    private ItemResponse convertToResponse(ItemEntity newItem) {
        return ItemResponse.builder()
                .itemId(newItem.getItemId())
                .name(newItem.getName())
                .description(newItem.getDescription())
                .price(newItem.getPrice())
                .imgUrl(newItem.getImgUrl())
                .categoryId(newItem.getCategory().getCategoryId())
                .categoryName(newItem.getCategory().getName())
                .createdAt(newItem.getCreatedAt())
                .updatedAt(newItem.getUpdatedAt())
                .build();
    }

    private ItemEntity convertToEntity(ItemRequest request) {
        return ItemEntity.builder()
                .itemId(UUID.randomUUID().toString())
                .name(request.getName())
                .description(request.getDescription())
                .price(request.getPrice())
                .build();
    }

    @Override
    public List<ItemResponse> read() {
        return itemRepository.findAll()
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public void delete(String itemId) {
        ItemEntity existingItem = itemRepository.findByItemId((itemId))
                .orElseThrow(() -> new RuntimeException("Item not found!"));
        cloudinaryService.deleteFile(existingItem.getImgUrl());
        itemRepository.delete(existingItem);
    }
}
