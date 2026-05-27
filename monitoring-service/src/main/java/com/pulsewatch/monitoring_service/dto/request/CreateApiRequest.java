package com.pulsewatch.monitoring_service.dto.request;

import jakarta.validation.constraints.*;

public record CreateApiRequest(

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
        Integer timeout

) {}