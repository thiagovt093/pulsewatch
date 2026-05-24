package com.pulsewatch.auth.domain.repositories;

import com.pulsewatch.auth.domain.entity.RefreshToken;

import java.util.Optional;

public interface IRefreshTokenRepository {
    RefreshToken save(RefreshToken token);
    Optional<RefreshToken> findByToken(String token);
    boolean existsByToken(String token);
}
