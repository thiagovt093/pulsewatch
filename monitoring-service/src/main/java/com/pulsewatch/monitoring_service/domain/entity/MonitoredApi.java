package com.pulsewatch.monitoring_service.domain.entity;

import com.pulsewatch.monitoring_service.domain.enums.ApiStatus;
import jakarta.persistence.*;
import lombok.*;
import com.pulsewatch.monitoring_service.domain.enums.HttpMethod;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter

@Entity
@Table(name = "monitored_apis")
@Builder
public class MonitoredApi {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, name = "user_id")
    private UUID userId;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false, length = 500)
    private String url;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private HttpMethod method;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, name = "current_status", length = 30)
    private ApiStatus currentStatus;

    @Column(nullable = false, name = "expected_status_code")
    private int expectedStatusCode;

    @Column(nullable = false, name = "check_interval")
    private int checkInterval;

    @Column(nullable = false)
    private int timeout;

    @Column(nullable = false)
    private Boolean active;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @OneToMany(
            mappedBy = "api",
            fetch = FetchType.LAZY
    )
    private List<MonitoringCheck> checks;

    @OneToMany(
            mappedBy="api",
            fetch=FetchType.LAZY
    )
    private List<HealthEvent> events;
}
