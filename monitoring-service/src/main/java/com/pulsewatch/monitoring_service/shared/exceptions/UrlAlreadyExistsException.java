package com.pulsewatch.monitoring_service.shared.exceptions;

public class UrlAlreadyExistsException extends RuntimeException {
    public UrlAlreadyExistsException(String message) {
        super(message);
    }
}
