package com.example.NeuroRec.controller;

import com.example.NeuroRec.dto.LoginRequest;
import com.example.NeuroRec.model.User;
import com.example.NeuroRec.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        User user = userService.authenticateUser(loginRequest.getUsernameOrEmail(), loginRequest.getSenha());

        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(401).body("Credenciais inválidas");
        }
    }
}
