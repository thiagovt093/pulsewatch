package com.pulsewatch.auth.infra.repositories;

import com.pulsewatch.auth.domain.entity.Role;
import com.pulsewatch.auth.domain.enums.RoleType;
import com.pulsewatch.auth.domain.repositories.IRoleRepository;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface RoleRepository extends JpaRepository<Role, Long>, IRoleRepository {
    Optional<Role> findByName(RoleType name);
    boolean existsByName(RoleType name);
}
