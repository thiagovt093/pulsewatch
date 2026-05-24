package com.pulsewatch.auth.application.usecases;

import com.pulsewatch.auth.domain.entity.User;
import com.pulsewatch.auth.domain.repositories.IUserRepository;
import com.pulsewatch.auth.dto.response.UserResponse;
import com.pulsewatch.auth.shared.exceptions.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class GetProfileUseCase  {
    private final IUserRepository userRepository;

    public UserResponse execute(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("Usuário não encontrado!"));
        return new UserResponse(user.getId(), user.getName(), user.getEmail(), user.getStatus());
    }
}
