package bd.iqbalshahed.billingsoftware.service;

import bd.iqbalshahed.billingsoftware.io.UserRequest;
import bd.iqbalshahed.billingsoftware.io.UserResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface UserService {

    UserResponse createUser(UserRequest request, MultipartFile file);

    String getUserRole(String email);

    List<UserResponse> readUsers();

    void deleteUser(String id);
}
