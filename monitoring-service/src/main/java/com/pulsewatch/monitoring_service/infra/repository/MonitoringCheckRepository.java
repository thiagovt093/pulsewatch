package com.pulsewatch.monitoring_service.infra.repository;
import com.pulsewatch.monitoring_service.domain.entity.MonitoringCheck;
import com.pulsewatch.monitoring_service.domain.repositories.IMonitoringCheckRepository;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface MonitoringCheckRepository extends JpaRepository<MonitoringCheck, UUID>, IMonitoringCheckRepository {

    List<MonitoringCheck>
    findTop50ByApiIdOrderByCheckedAtDesc(
            UUID apiId
    );

}