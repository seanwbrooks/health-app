CREATE TABLE reconciliation_log (
    log_id UUID PRIMARY KEY,
    patient_id UUID REFERENCES patients(patient_id),
    entity_id UUID, -- references condition_id, allergy_id, procedure_id, or medication_id
    entity_type VARCHAR(255), -- 'condition', 'allergy', 'procedure', 'medication'
    field_name VARCHAR(255), -- 'name', 'status', etc.
    original_value VARCHAR(255),
    patient_value VARCHAR(255),
    clinician_value VARCHAR(255),
    resolved_value VARCHAR(255),
    resolved_by VARCHAR(50), -- 'patient', 'clinician', 'automated'
    conflict_status VARCHAR(50), -- 'pending', 'resolved', 'no_conflict'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
