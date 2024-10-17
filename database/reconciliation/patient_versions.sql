CREATE TABLE patient_versions (
    version_id UUID PRIMARY KEY,
    patient_id UUID REFERENCES patients(patient_id),
    entity_id UUID, -- references condition_id, allergy_id, procedure_id, or medication_id
    entity_type VARCHAR(255), -- 'condition', 'allergy', 'procedure', 'medication'
    field_name VARCHAR(255), -- e.g., name, diagnosed_date, status, etc.
    field_value VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);