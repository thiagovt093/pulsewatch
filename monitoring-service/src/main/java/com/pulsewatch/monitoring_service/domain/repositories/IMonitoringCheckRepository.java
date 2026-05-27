package com.pulsewatch.monitoring_service.domain.repositories;

import com.pulsewatch.monitoring_service.domain.entity.MonitoringCheck;

import java.util.List;
import java.util.UUID;

public interface IMonitoringCheckRepository {
    MonitoringCheck save(MonitoringCheck monitoringCheck);
    List<MonitoringCheck>
    findTop50ByApiIdOrderByCheckedAtDesc(
            UUID apiId
    );
}
