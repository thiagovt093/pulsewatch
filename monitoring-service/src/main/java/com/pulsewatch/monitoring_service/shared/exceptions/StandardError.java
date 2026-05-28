package com.pulsewatch.monitoring_service.shared.exceptions;

import java.time.LocalDateTime;

public record StandardError(
        String error,
        int status,
        String message,
        String path,
        LocalDateTime timestamp
) {}
