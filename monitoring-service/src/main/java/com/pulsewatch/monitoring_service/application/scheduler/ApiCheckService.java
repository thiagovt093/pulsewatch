package com.pulsewatch.monitoring_service.application.scheduler;

import com.pulsewatch.monitoring_service.domain.entity.HealthEvent;
import com.pulsewatch.monitoring_service.domain.entity.MonitoredApi;
import com.pulsewatch.monitoring_service.domain.entity.MonitoringCheck;
import com.pulsewatch.monitoring_service.domain.enums.ApiStatus;
import com.pulsewatch.monitoring_service.domain.repositories.IHealthEventRepository;
import com.pulsewatch.monitoring_service.domain.repositories.IMonitoredApiRepository;
import com.pulsewatch.monitoring_service.domain.repositories.IMonitoringCheckRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestClient;

import java.time.LocalDateTime;

@Slf4j
@Service
@RequiredArgsConstructor
public class ApiCheckService {
    private final IMonitoredApiRepository monitoredApiRepository;
    private final IMonitoringCheckRepository monitoringCheckRepository;
    private final IHealthEventRepository healthEventRepository;
    private final RestClient restClient;

    @Value("${monitoring.degraded.threshold:3000}")
    private long degradedThreshold;

    @Transactional
    public void checkApi(MonitoredApi monitoredApi) {
        long startTime = System.currentTimeMillis();
        try {
            var responseEntity = restClient
                    .method(org.springframework.http.HttpMethod.valueOf(monitoredApi.getMethod().name()))
                    .uri(monitoredApi.getUrl())
                    .retrieve()
                    .toBodilessEntity();

            long responseTime = System.currentTimeMillis() - startTime;
            int statusCode = responseEntity.getStatusCode().value();
            boolean success = statusCode == monitoredApi.getExpectedStatusCode();

            ApiStatus newStatus;
            if (!success) {
                newStatus = ApiStatus.DOWN;
            } else if (responseTime > degradedThreshold) {
                newStatus = ApiStatus.DEGRADED;
            } else {
                newStatus = ApiStatus.UP;
            }
            MonitoringCheck check = MonitoringCheck.builder()
                    .api(monitoredApi)
                    .responseTime(responseTime)
                    .statusCode(statusCode)
                    .success(success)
                    .checkedAt(LocalDateTime.now())
                    .build();
            monitoringCheckRepository.save(check);
            log.info("[{}] {} — {}ms — {}", monitoredApi.getName(), statusCode, responseTime, newStatus);

            // Se o status mudou → salva HealthEvent
            if (monitoredApi.getCurrentStatus() != newStatus) {
                HealthEvent event = HealthEvent.builder()
                        .api(monitoredApi)
                        .status(newStatus)
                        .message("Status mudou de " + monitoredApi.getCurrentStatus() + " para " + newStatus)
                        .createdAt(LocalDateTime.now())
                        .build();
                healthEventRepository.save(event);

                // Atualiza o status da API
                monitoredApi.setCurrentStatus(newStatus);
                monitoredApiRepository.save(monitoredApi);
            }
        } catch (Exception e) {
            long responseTime = System.currentTimeMillis() - startTime;

            MonitoringCheck check = MonitoringCheck.builder()
                    .api(monitoredApi)
                    .responseTime(responseTime)
                    .statusCode(0)
                    .success(false)
                    .errorMessage(e.getMessage())
                    .checkedAt(LocalDateTime.now())
                    .build();
            monitoringCheckRepository.save(check);

            if (monitoredApi.getCurrentStatus() != ApiStatus.DOWN) {
                HealthEvent event = HealthEvent.builder()
                        .api(monitoredApi)
                        .status(ApiStatus.DOWN)
                        .message("API inacessível: " + e.getMessage())
                        .createdAt(LocalDateTime.now())
                        .build();
                healthEventRepository.save(event);

                monitoredApi.setCurrentStatus(ApiStatus.DOWN);
                monitoredApiRepository.save(monitoredApi);
                log.error("[{}] Falha ao verificar: {}", monitoredApi.getName(), e.getMessage());
            }
        }
    }
}
