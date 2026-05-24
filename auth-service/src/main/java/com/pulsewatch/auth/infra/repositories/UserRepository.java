package com.pulsewatch.auth.infra.repositories;

import com.pulsewatch.auth.domain.entity.User;
import com.pulsewatch.auth.domain.repositories.IUserRepository;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID>, IUserRepository {
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
}
