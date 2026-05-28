package com.pulsewatch.monitoring_service.dto.response;

import com.pulsewatch.monitoring_service.domain.enums.ApiStatus;

import java.time.LocalDateTime;

public record MonitoringHistoryResponse(
        ApiStatus status,
        Integer statusCode,
        Long responseTime,
        String errorMessage,
        LocalDateTime checkedAt
) {}
