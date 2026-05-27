package com.pulsewatch.monitoring_service.application.usecases;

import com.pulsewatch.monitoring_service.domain.entity.MonitoredApi;
import com.pulsewatch.monitoring_service.domain.enums.ApiStatus;
import com.pulsewatch.monitoring_service.domain.enums.HttpMethod;
import com.pulsewatch.monitoring_service.domain.repositories.IMonitoredApiRepository;
import com.pulsewatch.monitoring_service.dto.request.CreateApiRequest;
import com.pulsewatch.monitoring_service.dto.response.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CreateApiUseCase {
    private final IMonitoredApiRepository monitoredApiRepository;

    public ApiResponse execute(CreateApiRequest request, UUID userId){
        if(monitoredApiRepository.existsByName(request.url())) throw new RuntimeException("Url já cadastrada!");

        MonitoredApi monitoredApi = MonitoredApi.builder()
                .name(request.name())
                .url(request.url())
                .method(HttpMethod.valueOf(request.method()))
                .expectedStatusCode(request.expectedStatusCode())
                .checkInterval(request.checkInterval())
                .timeout(request.timeout())
                .userId(userId)              // ← falta — vem do JWT
                .active(true)                // ← falta — começa ativo
                .currentStatus(ApiStatus.PAUSED)  // ← falta — começa pausado
                .createdAt(LocalDateTime.now())   // ← falta
                .build();
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
