package com.pulsewatch.monitoring_service.dto.response;

import com.pulsewatch.monitoring_service.domain.enums.ApiStatus;

import java.time.LocalDateTime;
import java.util.UUID;

public record ApiResponse(

        UUID id,

        String name,

        String url,

        ApiStatus currentStatus,

        LocalDateTime createdAt

) {}