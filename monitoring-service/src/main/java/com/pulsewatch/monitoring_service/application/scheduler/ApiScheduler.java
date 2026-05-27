    package com.pulsewatch.monitoring_service.application.scheduler;

    import com.pulsewatch.monitoring_service.domain.entity.HealthEvent;
    import com.pulsewatch.monitoring_service.domain.entity.MonitoredApi;
    import com.pulsewatch.monitoring_service.domain.entity.MonitoringCheck;
    import com.pulsewatch.monitoring_service.domain.enums.ApiStatus;
    import com.pulsewatch.monitoring_service.domain.repositories.*;
    import lombok.RequiredArgsConstructor;
    import org.springframework.scheduling.annotation.Scheduled;
    import org.springframework.stereotype.Component;
    import org.springframework.web.client.RestClient;

    import java.time.LocalDateTime;
    import java.util.List;

    @Component
    @RequiredArgsConstructor
    public class ApiScheduler {

        private final IMonitoredApiRepository monitoredApiRepository;
        private final IMonitoringCheckRepository monitoringCheckRepository;
        private final IHealthEventRepository healthEventRepository;
        private final RestClient restClient;

        @Scheduled(fixedDelay = 60000)
        public void checkApis() {
            List<MonitoredApi> activesApis = monitoredApiRepository.findByActiveTrue();
            activesApis.forEach(this::checkApi);
        }

        private void checkApi(MonitoredApi monitoredApi){
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

                ApiStatus newStatus = success ? ApiStatus.UP : ApiStatus.DOWN;
                MonitoringCheck check = MonitoringCheck.builder()
                        .api(monitoredApi)
                        .responseTime(responseTime)
                        .statusCode(statusCode)
                        .success(success)
                        .checkedAt(LocalDateTime.now())
                        .build();
                monitoringCheckRepository.save(check);

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
                }
            }
        }
    }