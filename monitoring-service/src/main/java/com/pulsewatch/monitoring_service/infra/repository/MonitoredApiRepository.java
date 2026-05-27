package com.pulsewatch.monitoring_service.infra.repository;

import com.pulsewatch.monitoring_service.domain.entity.MonitoredApi;
import com.pulsewatch.monitoring_service.domain.repositories.IMonitoredApiRepository;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface MonitoredApiRepository extends JpaRepository<MonitoredApi, UUID>, IMonitoredApiRepository {

    List<MonitoredApi> findByUserId(UUID userId);

    List<MonitoredApi> findByActiveTrue();

    Optional<MonitoredApi> findByIdAndUserId(
            UUID id,
            UUID userId
    );
    Optional<MonitoredApi> findByName(String url);
    boolean existsByName(String url);

}