CREATE TABLE procedures (
    procedure_id UUID PRIMARY KEY,
    patient_id UUID REFERENCES patients(patient_id),
    name VARCHAR(255),
    date DATE,
    category VARCHAR(255), -- e.g., Dental, Surgical, etc.
    start_date DATE,
    end_date DATE,
    conflict_status VARCHAR(50), -- 'pending', 'resolved', 'no_conflict'
    resolved_by VARCHAR(50), -- 'patient', 'clinician'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
