CREATE TABLE audit_logs (
    audit_id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(user_id),
    patient_id UUID REFERENCES patients(patient_id),
    entity_id UUID, -- references condition_id, allergy_id, procedure_id, or medication_id
    entity_type VARCHAR(255), -- 'condition', 'allergy', 'procedure', 'medication'
    action VARCHAR(255), -- 'created', 'updated', 'deleted', 'reconciled'
    field_name VARCHAR(255),
    old_value VARCHAR(255),
    new_value VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
