package bd.iqbalshahed.billingsoftware.controller;

import bd.iqbalshahed.billingsoftware.io.AuthRequest;
import bd.iqbalshahed.billingsoftware.io.AuthResponse;
import bd.iqbalshahed.billingsoftware.service.UserService;
import bd.iqbalshahed.billingsoftware.service.impl.AppUserDetailsService;
import bd.iqbalshahed.billingsoftware.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.Map;

@RestController
@RequiredArgsConstructor
public class AuthController {

    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final AppUserDetailsService appUserDetailsService;
    private final UserService userService;
    private final JwtUtil jwtUtil;

    @PostMapping("/login")
    public AuthResponse login(@RequestBody AuthRequest request){
        authenticate(request.getEmail(), request.getPassword());
        final UserDetails userDetails = appUserDetailsService.loadUserByUsername(request.getEmail());
        final String jwtToken = jwtUtil.generateToken(userDetails);
        String role = userService.getUserRole(request.getEmail());
        return new AuthResponse(request.getEmail(), role, jwtToken);
    }

    private void authenticate(String email, String password) {
        try{
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
        } catch (DisabledException e){
            throw new RuntimeException("User disable");
        } catch (BadCredentialsException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email or password is incorect");
        }
    }

    @PostMapping("/encode")
    public String encodedPassword(@RequestBody Map<String, String> request){
        return passwordEncoder.encode(request.get("password"));
    }
}
