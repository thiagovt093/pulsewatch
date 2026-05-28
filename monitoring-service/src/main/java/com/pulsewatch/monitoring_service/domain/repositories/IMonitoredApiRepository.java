package com.pulsewatch.monitoring_service.domain.repositories;

import com.pulsewatch.monitoring_service.domain.entity.MonitoredApi;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface IMonitoredApiRepository {
    MonitoredApi save(MonitoredApi monitoredApi);
    void deleteById(UUID id);
    List<MonitoredApi> findByUserId(UUID userId);
    List<MonitoredApi> findByActiveTrue();
    Optional<MonitoredApi> findByIdAndUserId(UUID id, UUID userId);
    Optional<MonitoredApi> findByName(String name);
    boolean existsByName(String name);
}
