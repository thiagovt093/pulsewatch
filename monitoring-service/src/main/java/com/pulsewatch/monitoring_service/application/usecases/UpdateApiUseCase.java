package com.pulsewatch.monitoring_service.application.usecases;

import com.pulsewatch.monitoring_service.domain.entity.MonitoredApi;
import com.pulsewatch.monitoring_service.domain.enums.HttpMethod;
import com.pulsewatch.monitoring_service.domain.repositories.IMonitoredApiRepository;
import com.pulsewatch.monitoring_service.dto.request.UpdateApiRequest;
import com.pulsewatch.monitoring_service.dto.response.ApiResponse;
import com.pulsewatch.monitoring_service.shared.exceptions.ApiNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UpdateApiUseCase {
    private final IMonitoredApiRepository monitoredApiRepository;

    public ApiResponse execute(UUID apiId, UUID userId, UpdateApiRequest request) {
        MonitoredApi monitoredApi = monitoredApiRepository.findByIdAndUserId(apiId, userId)
                .orElseThrow(() -> new ApiNotFoundException("API não encontrada"));

        monitoredApi.setName(request.name());
        monitoredApi.setUrl(request.url());
        monitoredApi.setMethod(HttpMethod.valueOf(request.method()));
        monitoredApi.setExpectedStatusCode(request.expectedStatusCode());
        monitoredApi.setCheckInterval(request.checkInterval());
        monitoredApi.setTimeout(request.timeout());
        monitoredApi.setActive(request.active());

        MonitoredApi savedApi = monitoredApiRepository.save(monitoredApi);

        return new ApiResponse(
                savedApi.getId(),
                savedApi.getName(),
                savedApi.getUrl(),
                savedApi.getCurrentStatus(),
                savedApi.getCreatedAt()
        );
    }
}
