package com.pulsewatch.monitoring_service.api;

import com.pulsewatch.monitoring_service.application.usecases.CreateApiUseCase;
import com.pulsewatch.monitoring_service.dto.request.CreateApiRequest;
import com.pulsewatch.monitoring_service.dto.response.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.jetbrains.annotations.NotNull;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Objects;
import java.util.UUID;

@RestController
@RequestMapping("/apis")
@RequiredArgsConstructor
public class ApiController {

    private final CreateApiUseCase createApiUseCase;

    @PostMapping
    public ResponseEntity<@NotNull ApiResponse> apis(@RequestBody @Valid CreateApiRequest request){
        String userId = (String) Objects.requireNonNull(SecurityContextHolder.getContext()
                        .getAuthentication())
                .getCredentials();
        assert userId != null;
        ApiResponse response = createApiUseCase.execute(request, UUID.fromString(userId));
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}
