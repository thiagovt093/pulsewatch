package com.pulsewatch.auth.infra.repositories;

import com.pulsewatch.auth.domain.entity.RefreshToken;
import com.pulsewatch.auth.domain.repositories.IRefreshTokenRepository;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, UUID>, IRefreshTokenRepository {
    Optional<RefreshToken> findByToken(String token);
    boolean existsByToken(String token);
}
