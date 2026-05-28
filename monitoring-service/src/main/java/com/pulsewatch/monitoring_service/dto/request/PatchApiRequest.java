package com.pulsewatch.monitoring_service.dto.request;

import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

public record PatchApiRequest(
        @Size(max = 100)
        String name,

        @Size(max = 500)
        String url,

        String method,

        Integer expectedStatusCode,

        @Positive
        Integer checkInterval,

        @Positive
        Integer timeout,

        Boolean active
) {}