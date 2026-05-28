package com.pulsewatch.monitoring_service.application.usecases;

import com.pulsewatch.monitoring_service.domain.entity.MonitoredApi;
import com.pulsewatch.monitoring_service.domain.repositories.IMonitoredApiRepository;
import com.pulsewatch.monitoring_service.dto.response.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class GetApisUseCase {
    private final IMonitoredApiRepository monitoredApiRepository;

    public List<ApiResponse> execute(UUID userId){
        List<MonitoredApi> monitoredApis = monitoredApiRepository.findByUserId(userId);
        return monitoredApis.stream()
                .map(api -> new ApiResponse(
                        api.getId(),
                        api.getName(),
                        api.getUrl(),
                        api.getCurrentStatus(),
                        api.getCreatedAt()
                )).toList();
    }
}
