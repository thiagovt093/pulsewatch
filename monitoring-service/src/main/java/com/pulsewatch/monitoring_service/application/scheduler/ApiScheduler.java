package com.pulsewatch.monitoring_service.application.scheduler;

import com.pulsewatch.monitoring_service.domain.entity.MonitoredApi;
import com.pulsewatch.monitoring_service.domain.repositories.IMonitoredApiRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
public class ApiScheduler {

    private final IMonitoredApiRepository monitoredApiRepository;
    private final ApiCheckService apiCheckService;

    @Scheduled(fixedDelay = 60000)
    public void checkApis() {
        List<MonitoredApi> activeApis = monitoredApiRepository.findByActiveTrue();
        log.info("Iniciando ciclo de monitoramento — {} APIs ativas", activeApis.size());
        activeApis.forEach(apiCheckService::checkApi);
    }
}