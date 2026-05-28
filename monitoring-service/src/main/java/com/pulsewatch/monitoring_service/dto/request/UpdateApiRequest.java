package com.pulsewatch.monitoring_service.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

public record UpdateApiRequest (
        @NotBlank
        @Size(max = 100)
        String name,

        @NotBlank
        @Size(max = 500)
        String url,

        @NotNull
        String method,

        @NotNull
        Integer expectedStatusCode,

        @Positive
        Integer checkInterval,

        @Positive
        Integer timeout,

        @NotNull
        Boolean active
){}
