CREATE TABLE allergies (
    allergy_id UUID PRIMARY KEY,
    patient_id UUID REFERENCES patients(patient_id),
    name VARCHAR(255),
    severity VARCHAR(255),
    reaction VARCHAR(255),
    conflict_status VARCHAR(50), -- 'pending', 'resolved', 'no_conflict'
    resolved_by VARCHAR(50), -- 'patient', 'clinician'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
