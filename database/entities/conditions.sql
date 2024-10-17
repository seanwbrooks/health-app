CREATE TABLE conditions (
    condition_id UUID PRIMARY KEY,
    patient_id UUID REFERENCES patients(patient_id),
    name VARCHAR(255),
    diagnosed_date DATE,
    status VARCHAR(255),
    start_date DATE,
    end_date DATE,
    conflict_status VARCHAR(50), -- 'pending', 'resolved', 'no_conflict'
    resolved_by VARCHAR(50), -- 'patient', 'clinician'
    is_active BOOLEAN DEFAULT TRUE, -- to track active vs resolved conditions
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
