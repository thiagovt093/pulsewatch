package com.pulsewatch.auth.domain.repositories;

import com.pulsewatch.auth.domain.entity.Role;
import com.pulsewatch.auth.domain.enums.RoleType;

import java.util.Optional;

public interface IRoleRepository {
    Role save(Role role);
    Optional<Role> findByName(RoleType name);
    boolean existsByName(RoleType name);
}
