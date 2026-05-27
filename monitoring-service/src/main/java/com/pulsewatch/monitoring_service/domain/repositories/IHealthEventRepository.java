package com.pulsewatch.monitoring_service.domain.repositories;

import com.pulsewatch.monitoring_service.domain.entity.HealthEvent;

import java.util.List;
import java.util.UUID;

public interface IHealthEventRepository {
    List<HealthEvent>
    findByApiId(UUID apiId);
    boolean existsById(UUID uuid);
}
