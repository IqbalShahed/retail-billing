package bd.iqbalshahed.billingsoftware.service;

import bd.iqbalshahed.billingsoftware.io.UserRequest;
import bd.iqbalshahed.billingsoftware.io.UserResponse;

import java.util.List;

public interface UserService {

    UserResponse createUser(UserRequest request);

    String getUserRole(String email);

    List<UserResponse> readUsers();

    void deleteUser(String id);
}
