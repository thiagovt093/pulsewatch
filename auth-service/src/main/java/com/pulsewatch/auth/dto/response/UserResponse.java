package com.pulsewatch.auth.dto.response;

import com.pulsewatch.auth.domain.enums.UserStatus;
import lombok.Builder;

import java.util.UUID;

public record UserResponse(
        UUID id,
        String name,
        String email,
        UserStatus status
) {}
