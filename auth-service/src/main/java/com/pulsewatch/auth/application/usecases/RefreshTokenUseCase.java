package com.pulsewatch.auth.application.usecases;

import com.pulsewatch.auth.domain.entity.RefreshToken;
import com.pulsewatch.auth.domain.repositories.IRefreshTokenRepository;
import com.pulsewatch.auth.domain.repositories.IUserRepository;
import com.pulsewatch.auth.dto.request.RefreshRequest;
import com.pulsewatch.auth.dto.response.AuthResponse;
import com.pulsewatch.auth.security.JwtService;
import com.pulsewatch.auth.shared.exceptions.TokenNotFound;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class RefreshTokenUseCase {
    private final IUserRepository userRepository;
    private final IRefreshTokenRepository tokenRepository;
    private final JwtService jwtService;

    public AuthResponse execute(RefreshRequest request){
        RefreshToken refreshToken = tokenRepository.findByToken(request.token())
                .orElseThrow(() -> new TokenNotFound("Refresh token não encontrado"));

        if(refreshToken.getRevoked() || refreshToken.getExpiresAt().isBefore(LocalDateTime.now())) throw new TokenNotFound("Token inválido ou expirado");
        String newToken = jwtService.generateToken(refreshToken.getUser());
        return new AuthResponse(newToken, refreshToken.getToken());
    }
}
