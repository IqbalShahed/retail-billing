package bd.iqbalshahed.billingsoftware.service.impl;

import bd.iqbalshahed.billingsoftware.entity.UserEntity;
import bd.iqbalshahed.billingsoftware.io.UserRequest;
import bd.iqbalshahed.billingsoftware.io.UserResponse;
import bd.iqbalshahed.billingsoftware.repository.UserRepository;
import bd.iqbalshahed.billingsoftware.service.CloudinaryService;
import bd.iqbalshahed.billingsoftware.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final CloudinaryService cloudinaryService;

    @Override
    public UserResponse createUser(UserRequest request, MultipartFile file) {
        String imgUrl;
        try{
            imgUrl = cloudinaryService.uploadFile(file);
        } catch (IOException e){
            throw new RuntimeException("Failed to upload file to Cloudinary", e);
        }
        UserEntity newUser = convertToEntity(request);
        newUser.setImgUrl(imgUrl);
        newUser = userRepository.save(newUser);
        return convertToResponse(newUser);
    }

    private UserEntity convertToEntity(UserRequest request) {
        return UserEntity.builder()
                .userId(UUID.randomUUID().toString())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(request.getRole())
                .name(request.getName())
                .build();
    }

    private UserResponse convertToResponse(UserEntity newUser) {
        return UserResponse.builder()
                .name(newUser.getName())
                .email(newUser.getEmail())
                .userId(newUser.getUserId())
                .role(newUser.getRole())
                .imgUrl(newUser.getImgUrl())
                .createdAt(newUser.getCreatedAt())
                .updatedAt(newUser.getUpdatedAt())
                .build();
    }

    @Override
    public String getUserRole(String email) {
        UserEntity existingUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found!"));
        return existingUser.getRole();
    }

    @Override
    public List<UserResponse> readUsers() {
        return userRepository.findAll()
                .stream()
                .map(user -> convertToResponse(user))
                .collect(Collectors.toList());
    }

    @Override
    public void deleteUser(String id) {
        // Get currently authenticated user's email
        String currentUserEmail = SecurityContextHolder.getContext().getAuthentication().getName();

        // Find current user entity
        UserEntity currentUser = userRepository.findByEmail(currentUserEmail)
                .orElseThrow(() -> new RuntimeException("Current user not found"));

        // Prevent deleting yourself
        if (currentUser.getUserId().equals(id)) {
            throw new IllegalArgumentException("You cannot delete your own account.");
        }

        // Find the user to delete
        UserEntity existingUser = userRepository.findByUserId(id)
                .orElseThrow(() -> new RuntimeException("User not found!"));

        // Delete the user
        userRepository.delete(existingUser);
    }

}
