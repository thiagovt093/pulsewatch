CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE TABLE IF NOT EXISTS monitored_apis (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    name varchar(255) NOT NULL,
    url varchar(255) NOT NULL,
    method varchar(30) NOT NULL,
    expected_status_code int NOT NULL,
    check_interval int NOT NULL,
    timeout int NOT NULL,
    active BOOLEAN NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS monitoring_checks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    api_id UUID NOT NULL,
    CONSTRAINT fk_check_api FOREIGN KEY (api_id) REFERENCES monitored_apis(id) ON DELETE CASCADE,
    response_time int NOT NULL,
    status_code int NOT NULL,
    success BOOLEAN NOT NULL,
    checked_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS health_events(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    api_id UUID NOT NULL,
    CONSTRAINT fk_check_api FOREIGN KEY (api_id) REFERENCES monitored_apis(id) ON DELETE CASCADE,
    status varchar(30) NOT NULL,
    message varchar(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);