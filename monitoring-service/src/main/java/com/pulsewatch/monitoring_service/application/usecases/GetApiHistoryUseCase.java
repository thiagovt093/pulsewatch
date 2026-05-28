package com.pulsewatch.monitoring_service.application.usecases;

import com.pulsewatch.monitoring_service.domain.entity.MonitoringCheck;
import com.pulsewatch.monitoring_service.domain.enums.ApiStatus;
import com.pulsewatch.monitoring_service.domain.repositories.IMonitoringCheckRepository;
import com.pulsewatch.monitoring_service.dto.response.MonitoringHistoryResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class GetApiHistoryUseCase {

    private final IMonitoringCheckRepository monitoringCheckRepository;

    public List<MonitoringHistoryResponse> execute(UUID userId, UUID apiId) {
        List<MonitoringCheck> monitoringChecks =
                monitoringCheckRepository
                        .findByApiIdAndApiUserIdOrderByCheckedAtDesc(
                                apiId,
                                userId
                        );
        return monitoringChecks.stream()
                .map(check -> new MonitoringHistoryResponse(
                        check.getSuccess() ? ApiStatus.UP : ApiStatus.DOWN,
                        check.getStatusCode(),
                        check.getResponseTime(),
                        check.getErrorMessage(),
                        check.getCheckedAt()
                ))
                .toList();
    }
}