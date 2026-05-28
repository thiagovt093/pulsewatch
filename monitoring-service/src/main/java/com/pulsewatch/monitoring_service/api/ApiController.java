package com.pulsewatch.monitoring_service.api;

import com.pulsewatch.monitoring_service.application.usecases.*;
import com.pulsewatch.monitoring_service.dto.request.CreateApiRequest;
import com.pulsewatch.monitoring_service.dto.request.PatchApiRequest;
import com.pulsewatch.monitoring_service.dto.request.UpdateApiRequest;
import com.pulsewatch.monitoring_service.dto.response.ApiResponse;
import com.pulsewatch.monitoring_service.dto.response.MonitoringHistoryResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;
import java.util.UUID;

@RestController
@RequestMapping("/apis")
@RequiredArgsConstructor
public class ApiController {

    private final CreateApiUseCase createApiUseCase;
    private final GetApisUseCase getApisUseCase;
    private final GetApiByIdUseCase getApiByIdUseCase;
    private final DeleteApiUseCase deleteApiUseCase;
    private final GetApiHistoryUseCase getApiHistoryUseCase;
    private final UpdateApiUseCase updateApiUseCase;
    private final PatchApiUseCase patchApiUseCase;

    private UUID getUserId() {
        String userId =
                (String) Objects.requireNonNull(SecurityContextHolder
                                .getContext()
                                .getAuthentication())
                        .getCredentials();
        return UUID.fromString(Objects.requireNonNull(userId));
    }

    @PostMapping
    public ResponseEntity<ApiResponse> apis(@RequestBody @Valid CreateApiRequest request) {
        ApiResponse response = createApiUseCase.execute(request, getUserId());
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping
    public ResponseEntity<List<ApiResponse>> getApis() {
        List<ApiResponse> response = getApisUseCase.execute(getUserId());
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getById(@PathVariable("id") UUID apiId) {
        ApiResponse response = getApiByIdUseCase.execute(getUserId(), apiId);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteById(@PathVariable("id") UUID apiId) {
        deleteApiUseCase.execute(getUserId(), apiId);
    }
    @GetMapping("/{id}/history")
    ResponseEntity<List<MonitoringHistoryResponse>> getHistory(@PathVariable("id") UUID apiId){
        List<MonitoringHistoryResponse> response = getApiHistoryUseCase.execute(getUserId(), apiId);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse> update(
            @PathVariable("id") UUID apiId,
            @RequestBody @Valid UpdateApiRequest request) {
        ApiResponse response = updateApiUseCase.execute(apiId, getUserId(), request);
        return ResponseEntity.ok(response);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<ApiResponse> patch(
            @PathVariable("id") UUID apiId,
            @RequestBody @Valid PatchApiRequest request) {
        ApiResponse response = patchApiUseCase.execute(apiId, getUserId(), request);
        return ResponseEntity.ok(response);
    }
}
