import { EditableField } from "../editable-fields";

export const MedicationsForm = ({ medications, setMedications }) => {
  const handleChange = (index, field, value) => {
    const updatedMedications = [...medications];
    updatedMedications[index][field] = value;
    setMedications(updatedMedications);
  };

  const addMedication = () => {
    setMedications([
      ...medications,
      { name: "", dosage: "", frequency: "", startDate: "", endDate: "" },
    ]);
  };

  const deleteMedication = (index) => {
    const updatedMedications = medications.filter((_, i) => i !== index);
    setMedications(updatedMedications);
  };

  return (
    <div>
      <h3>Medications</h3>
      {medications.map((medication, index) => (
        <div key={index} className="card">
          <div className="card-body">
            <EditableField
              label="Medication Name"
              value={medication.name}
              onChange={(value) => handleChange(index, "name", value)}
            />
            <EditableField
              label="Dosage"
              value={medication.dosage}
              onChange={(value) => handleChange(index, "dosage", value)}
            />
            <EditableField
              label="Frequency"
              value={medication.frequency}
              onChange={(value) => handleChange(index, "frequency", value)}
            />
            <EditableField
              label="Start Date"
              value={medication.startDate}
              onChange={(value) => handleChange(index, "startDate", value)}
            />
            <EditableField
              label="End Date"
              value={medication.endDate}
              onChange={(value) => handleChange(index, "endDate", value)}
            />
            <button
              className="btn btn-danger"
              onClick={() => deleteMedication(index)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
      <button className="btn btn-primary" onClick={addMedication}>
        Add Medication
      </button>
    </div>
  );
};
