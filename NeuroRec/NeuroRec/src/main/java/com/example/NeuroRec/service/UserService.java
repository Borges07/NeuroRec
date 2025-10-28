package com.example.NeuroRec.service;

import com.example.NeuroRec.model.User;
import com.example.NeuroRec.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User createUser(User user) {
        // Validações básicas
        if (user.getNome() == null || user.getNome().isBlank() ||
                user.getEmail() == null || user.getEmail().isBlank() ||
                user.getSenha() == null || user.getSenha().isBlank() ||
                user.getUserName() == null || user.getUserName().isBlank()) {

            throw new IllegalArgumentException("Os campos nome, userName, email e password não podem estar vazios.");
        }

        // Verifica duplicidade
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new IllegalStateException("Email já cadastrado");
        }

        if (userRepository.existsByUserName(user.getUserName())) {
            throw new IllegalStateException("UserName já cadastrado");
        }

        String hashed = passwordEncoder.encode(user.getSenha());
        user.setSenha(hashed);


        return userRepository.save(user);
    }

    public List<User> listAllUsers() {
        return userRepository.findAll();
    }

    public User authenticateUser(String usernameOrEmail, String senha) {
        Optional<User> userOpt = userRepository.findByUserName(usernameOrEmail);

        if (!userOpt.isPresent()) {
            userOpt = userRepository.findByEmail(usernameOrEmail);
        }

        if (!userOpt.isPresent()) {
            return null;
        }

        User user = userOpt.get();

        if (passwordEncoder.matches(senha, user.getSenha())) {
            return user;
        } else {
            return null;
        }
    }
}
