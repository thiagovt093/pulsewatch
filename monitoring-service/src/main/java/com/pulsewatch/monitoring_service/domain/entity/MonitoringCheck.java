package com.pulsewatch.monitoring_service.domain.entity;

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
@Table(name = "monitoring_checks")
public class MonitoringCheck {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "api_id",
            nullable = false
    )
    private MonitoredApi api;


    @Column(name = "response_time")
    private Long responseTime;


    @Column(name = "status_code")
    private Integer statusCode;


    @Column(nullable = false)
    private Boolean success;


    @Column(name = "error_message", columnDefinition = "TEXT")
    private String errorMessage;


    @Column(name = "checked_at")
    private LocalDateTime checkedAt;

}