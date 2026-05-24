package com.pulsewatch.auth.api;

import com.pulsewatch.auth.application.usecases.GetProfileUseCase;
import com.pulsewatch.auth.dto.response.UserResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Objects;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {
    private final GetProfileUseCase getProfileUseCase;

    @GetMapping("/me")
    public ResponseEntity<UserResponse> me(){
        String email = Objects.requireNonNull(SecurityContextHolder.getContext()
                        .getAuthentication())
                .getName();
        return ResponseEntity.ok(getProfileUseCase.execute(email));
    }
}
