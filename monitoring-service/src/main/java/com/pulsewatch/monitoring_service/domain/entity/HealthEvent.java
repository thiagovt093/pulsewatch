package com.pulsewatch.monitoring_service.domain.entity;

import com.pulsewatch.monitoring_service.domain.enums.ApiStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder

@Entity
@Table(name = "health_events")
public class HealthEvent {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "api_id",
            nullable = false
    )
    private MonitoredApi api;


    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private ApiStatus status;


    @Column(nullable = false, columnDefinition = "TEXT")
    private String message;


    @Column(name = "created_at")
    private LocalDateTime createdAt;

}