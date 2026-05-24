package com.pulsewatch.auth.application.usecases;

import com.pulsewatch.auth.domain.entity.RefreshToken;
import com.pulsewatch.auth.domain.entity.User;
import com.pulsewatch.auth.domain.repositories.IRefreshTokenRepository;
import com.pulsewatch.auth.domain.repositories.IUserRepository;
import com.pulsewatch.auth.dto.request.LoginRequest;
import com.pulsewatch.auth.dto.response.AuthResponse;
import com.pulsewatch.auth.security.JwtService;
import com.pulsewatch.auth.shared.exceptions.InvalidPasswordException;
import com.pulsewatch.auth.shared.exceptions.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class LoginUseCase {
    private final IUserRepository userRepository;
    private final IRefreshTokenRepository refreshTokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthResponse execute(LoginRequest request) {
        User user = userRepository.findByEmail(request.email())
                .orElseThrow(() -> new UserNotFoundException("Usuário não encontrado!"));
        if(!passwordEncoder.matches(request.password(), user.getPassword())) throw new InvalidPasswordException("Senha inválida!");
        String token = jwtService.generateToken(user);
        String refreshToken = jwtService.generateRefreshToken(user);

        RefreshToken refreshTokenEntity = RefreshToken.builder()
                .token(refreshToken)
                .user(user)
                .revoked(false)
                .expiresAt(LocalDateTime.now().plusDays(7))
                .createdAt(LocalDateTime.now())
                .build();

        refreshTokenRepository.save(refreshTokenEntity);
        return new AuthResponse(token, refreshToken);
    }
}
