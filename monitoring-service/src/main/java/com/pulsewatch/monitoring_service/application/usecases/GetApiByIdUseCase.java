package com.pulsewatch.monitoring_service.application.usecases;

import com.pulsewatch.monitoring_service.domain.entity.MonitoredApi;
import com.pulsewatch.monitoring_service.domain.repositories.IMonitoredApiRepository;
import com.pulsewatch.monitoring_service.dto.response.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class GetApiByIdUseCase {
    private final IMonitoredApiRepository monitoredApiRepository;

    public ApiResponse execute(UUID userId, UUID apiId){
        MonitoredApi monitoredApi = monitoredApiRepository.findByIdAndUserId(apiId, userId)
                .orElseThrow(() -> new RuntimeException("API não encontrada"));
        return new ApiResponse(
                monitoredApi.getId(),
                monitoredApi.getName(),
                monitoredApi.getUrl(),
                monitoredApi.getCurrentStatus(),
                monitoredApi.getCreatedAt());
    }
}
