package com.pulsewatch.monitoring_service.shared.exceptions;

public class ApiNotFoundException extends RuntimeException {
    public ApiNotFoundException(String message) {
        super(message);
    }
}
