package com.pulsewatch.auth.application.usecases;

import com.pulsewatch.auth.domain.entity.Role;
import com.pulsewatch.auth.domain.entity.User;
import com.pulsewatch.auth.domain.enums.RoleType;
import com.pulsewatch.auth.domain.enums.UserStatus;
import com.pulsewatch.auth.domain.repositories.IRefreshTokenRepository;
import com.pulsewatch.auth.domain.repositories.IRoleRepository;
import com.pulsewatch.auth.domain.repositories.IUserRepository;
import com.pulsewatch.auth.dto.request.RegisterRequest;
import com.pulsewatch.auth.dto.response.UserResponse;
import com.pulsewatch.auth.shared.exceptions.EmailAlreadyExistsException;
import com.pulsewatch.auth.shared.exceptions.RoleNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class RegisterUserUseCase {

    private final IRoleRepository roleRepository;
    private final IUserRepository userRepository;
    private final IRefreshTokenRepository tokenRepository;
    private final PasswordEncoder passwordEncoder;

    public UserResponse execute(RegisterRequest request){

        if(userRepository.existsByEmail(request.email())) throw new EmailAlreadyExistsException("Email já cadastrado");

        String encodedPassword = passwordEncoder.encode(request.password());

        Role userRole = roleRepository.findByName(RoleType.USER).orElseThrow(() -> new RoleNotFoundException("Role USER não encontrado"));
        User user = User.builder()
                .name(request.name())
                .email(request.email())
                .password(encodedPassword)
                .status(UserStatus.ACTIVE)
                .roles(new HashSet<>(Set.of(userRole)))
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();
        User savedUser = userRepository.save(user);

        return new UserResponse(
                savedUser.getId(),
                savedUser.getName(),
                savedUser.getEmail(),
                savedUser.getStatus()
        );
    }

}
