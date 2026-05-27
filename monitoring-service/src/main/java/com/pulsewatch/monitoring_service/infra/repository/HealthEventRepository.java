package com.pulsewatch.monitoring_service.infra.repository;

import com.pulsewatch.monitoring_service.domain.entity.HealthEvent;
import com.pulsewatch.monitoring_service.domain.repositories.IHealthEventRepository;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface HealthEventRepository extends JpaRepository<HealthEvent, UUID>, IHealthEventRepository {
    List<HealthEvent>
    findByApiId(UUID apiId);
    boolean existsById(UUID uuid);
}