package com.pulsewatch.auth.dto.request;

import jakarta.validation.constraints.NotBlank;

public record RefreshRequest(
        @NotBlank(message = "O Token não pode estar vazio!")
        String token
) {}
