package com.pulsewatch.auth.dto.response;

public record AuthResponse(
        String token,
        String refreshToken
) {}
