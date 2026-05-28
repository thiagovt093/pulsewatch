package com.pulsewatch.monitoring_service.application.usecases;

import com.pulsewatch.monitoring_service.domain.entity.MonitoredApi;
import com.pulsewatch.monitoring_service.domain.repositories.IMonitoredApiRepository;
import com.pulsewatch.monitoring_service.shared.exceptions.ApiNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class DeleteApiUseCase {
    private final IMonitoredApiRepository monitoredApiRepository;
    public void execute(UUID userId, UUID apiId) {
        MonitoredApi monitoredApi = monitoredApiRepository.findByIdAndUserId(apiId, userId)
                .orElseThrow(() -> new ApiNotFoundException("API não encontrada"));
        monitoredApiRepository.deleteById(monitoredApi.getId());
    }
}
