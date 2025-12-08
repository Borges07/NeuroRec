package com.example.NeuroRec.service;

import com.example.NeuroRec.model.User;
import com.example.NeuroRec.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final String adminUsername;
    private final String adminEmail;
    private final String adminEncodedPassword;

    @Autowired
    public UserService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            @Value("${app.admin.username:admin}") String adminUsername,
            @Value("${app.admin.password:Admin#2025}") String adminPassword,
            @Value("${app.admin.email:admin@neurorec.local}") String adminEmail
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.adminUsername = adminUsername;
        this.adminEmail = adminEmail;
        this.adminEncodedPassword = passwordEncoder.encode(adminPassword);
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
        if (isAdminCredentials(usernameOrEmail, senha)) {
            return buildAdminUser();
        }

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

    private boolean isAdminCredentials(String usernameOrEmail, String senha) {
        boolean usernameMatches = usernameOrEmail.equalsIgnoreCase(adminUsername)
                || usernameOrEmail.equalsIgnoreCase(adminEmail);
        return usernameMatches && passwordEncoder.matches(senha, adminEncodedPassword);
    }

    private User buildAdminUser() {
        User admin = new User();
        admin.setUserName(adminUsername);
        admin.setEmail(adminEmail);
        admin.setNome("Administrador");
        admin.setSenha(adminEncodedPassword);
        return admin;
    }

    public boolean isAdminUser(User user) {
        if (user == null || user.getUserName() == null) {
            return false;
        }
        return user.getUserName().equalsIgnoreCase(adminUsername);
    }
}
