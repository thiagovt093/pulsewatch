package com.pulsewatch.monitoring_service.shared.exceptions;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.stream.Collectors;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<StandardError> handleRuntimeException(
            RuntimeException ex, HttpServletRequest request) {
        StandardError error = new StandardError(
                "Bad Request",
                HttpStatus.BAD_REQUEST.value(),
                ex.getMessage(),
                request.getRequestURI(),
                LocalDateTime.now()
        );

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<StandardError> handleException(
            Exception ex, HttpServletRequest request) {
        StandardError error = new StandardError(
                "Internal Server Error",
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                ex.getMessage(),
                request.getRequestURI(),
                LocalDateTime.now()
        );

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<StandardError> handleValidation(
            MethodArgumentNotValidException ex, HttpServletRequest request) {
        String message = ex.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(f -> f.getField() + ": " + f.getDefaultMessage())
                .collect(Collectors.joining(", "));

        StandardError error = new StandardError(
                "Validation Error",
                HttpStatus.UNPROCESSABLE_ENTITY.value(),
                message,
                request.getRequestURI(),
                LocalDateTime.now()
        );

        return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body(error);
    }

    @ExceptionHandler(ApiNotFoundException.class)
    public ResponseEntity<StandardError> handleApiNotFound(
            ApiNotFoundException ex, HttpServletRequest request) {
        StandardError error = new StandardError(
                "Not Found",
                HttpStatus.NOT_FOUND.value(),
                ex.getMessage(),
                request.getRequestURI(),
                LocalDateTime.now()
        );

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }

    @ExceptionHandler(UrlAlreadyExistsException.class)
    public ResponseEntity<StandardError> handleUrlExists(
            UrlAlreadyExistsException ex, HttpServletRequest request) {
        StandardError error = new StandardError(
                "Conflict",
                HttpStatus.CONFLICT.value(),
                ex.getMessage(),
                request.getRequestURI(),
                LocalDateTime.now()
        );

        return ResponseEntity.status(HttpStatus.CONFLICT).body(error);
    }
}
