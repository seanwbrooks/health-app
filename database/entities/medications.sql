CREATE TABLE medications (
    medication_id UUID PRIMARY KEY,
    patient_id UUID REFERENCES patients(patient_id),
    name VARCHAR(255),
    dosage VARCHAR(255),
    frequency VARCHAR(255),
    start_date DATE,
    end_date DATE,
    conflict_status VARCHAR(50), -- 'pending', 'resolved', 'no_conflict'
    resolved_by VARCHAR(50), -- 'patient', 'clinician'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
