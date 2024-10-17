import { EditableField } from "../editable-fields";

export const AllergiesForm = ({ allergies, setAllergies }) => {
  const handleChange = (index, field, value) => {
    const updatedAllergies = [...allergies];
    updatedAllergies[index][field] = value;
    setAllergies(updatedAllergies);
  };

  const addAllergy = () => {
    setAllergies([...allergies, { name: "", severity: "", reaction: "" }]);
  };

  const deleteAllergy = (index) => {
    const updatedAllergies = allergies.filter((_, i) => i !== index);
    setAllergies(updatedAllergies);
  };

  return (
    <div>
      <h3>Allergies</h3>
      {allergies.map((allergy, index) => (
        <div key={index} className="card">
          <div className="card-body">
            <EditableField
              label="Allergy Name"
              value={allergy.name}
              onChange={(value) => handleChange(index, "name", value)}
            />
            <EditableField
              label="Severity"
              value={allergy.severity}
              onChange={(value) => handleChange(index, "severity", value)}
            />
            <EditableField
              label="Reaction"
              value={allergy.reaction}
              onChange={(value) => handleChange(index, "reaction", value)}
            />
            <button
              className="btn btn-danger"
              onClick={() => deleteAllergy(index)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
      <button className="btn btn-primary" onClick={addAllergy}>
        Add Allergy
      </button>
    </div>
  );
};
