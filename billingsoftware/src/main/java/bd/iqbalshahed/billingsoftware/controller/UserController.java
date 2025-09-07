package bd.iqbalshahed.billingsoftware.controller;

import bd.iqbalshahed.billingsoftware.io.UserRequest;
import bd.iqbalshahed.billingsoftware.io.UserResponse;
import bd.iqbalshahed.billingsoftware.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
@RestController
@RequiredArgsConstructor
@RequestMapping("/admin")
public class UserController {
    private final UserService userService;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public UserResponse registerUser(@RequestPart("user") String userString, @RequestPart("file")MultipartFile file){
        ObjectMapper objectMapper = new ObjectMapper();
        UserRequest request = null;
        try{
            request = objectMapper.readValue(userString, UserRequest.class);
            return userService.createUser(request, file);
        } catch (Exception e){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Unable to crate user, try again");
        }
    }

    @GetMapping("/users")
    public List<UserResponse> readUsers(){
        return userService.readUsers();
    }

    @DeleteMapping("/users/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteUser(@PathVariable String id){
        try {
            userService.deleteUser(id);
        } catch (Exception e){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Unable to delete user");
        }
    }


}
