UPDATE monitored_apis
SET current_status = 'PAUSED'
WHERE current_status IS NULL;