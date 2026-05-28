package com.pulsewatch.monitoring_service.application.usecases;

import com.pulsewatch.monitoring_service.domain.entity.MonitoredApi;
import com.pulsewatch.monitoring_service.domain.enums.HttpMethod;
import com.pulsewatch.monitoring_service.domain.repositories.IMonitoredApiRepository;
import com.pulsewatch.monitoring_service.dto.request.PatchApiRequest;
import com.pulsewatch.monitoring_service.dto.response.ApiResponse;
import com.pulsewatch.monitoring_service.shared.exceptions.ApiNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PatchApiUseCase {
    private final IMonitoredApiRepository monitoredApiRepository;

    public ApiResponse execute(UUID apiId, UUID userId, PatchApiRequest request) {
        MonitoredApi monitoredApi = monitoredApiRepository.findByIdAndUserId(apiId, userId)
                .orElseThrow(() ->  new ApiNotFoundException("API não encontrada"));

        Optional.ofNullable(request.name()).ifPresent(monitoredApi::setName);
        Optional.ofNullable(request.url()).ifPresent(monitoredApi::setUrl);
        Optional.ofNullable(request.method()).map(HttpMethod::valueOf).ifPresent(monitoredApi::setMethod);
        Optional.ofNullable(request.expectedStatusCode()).ifPresent(monitoredApi::setExpectedStatusCode);
        Optional.ofNullable(request.checkInterval()).ifPresent(monitoredApi::setCheckInterval);
        Optional.ofNullable(request.timeout()).ifPresent(monitoredApi::setTimeout);
        Optional.ofNullable(request.active()).ifPresent(monitoredApi::setActive);

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
