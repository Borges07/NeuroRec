package com.example.NeuroRec.security;

import com.example.NeuroRec.model.User;
import com.example.NeuroRec.repository.UserRepository;
import org.springframework.security.core.userdetails.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository repository;
    private final String adminUsername;
    private final String adminEmail;
    private final String adminPassword;
    private final PasswordEncoder passwordEncoder;

    public CustomUserDetailsService(
            UserRepository repository,
            PasswordEncoder passwordEncoder,
            @Value("${app.admin.username:admin}") String adminUsername,
            @Value("${app.admin.password:Admin#2025}") String adminPassword,
            @Value("${app.admin.email:admin@neurorec.local}") String adminEmail
    ) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
        this.adminUsername = adminUsername;
        this.adminEmail = adminEmail;
        this.adminPassword = adminPassword;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        if (isAdminUsername(username)) {
            return org.springframework.security.core.userdetails.User
                    .withUsername(adminUsername)
                    .password(passwordEncoder.encode(adminPassword))
                    .authorities("ADMIN")
                    .build();
        }

        User user = repository.findByUserName(username)
                .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado: " + username));

        return org.springframework.security.core.userdetails.User
                .withUsername(user.getUserName())
                .password(user.getSenha())
                .authorities("USER")
                .build();
    }

    private boolean isAdminUsername(String username) {
        return username.equalsIgnoreCase(adminUsername) || username.equalsIgnoreCase(adminEmail);
    }
}
