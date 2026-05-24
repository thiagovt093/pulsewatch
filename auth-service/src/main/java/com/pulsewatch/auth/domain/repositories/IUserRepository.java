package com.pulsewatch.auth.domain.repositories;

import com.pulsewatch.auth.domain.entity.User;

import java.util.Optional;

public interface IUserRepository {
    User save(User user);
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
}
