import { EditableField } from "../editable-fields";

export const ConditionsForm = ({ conditions, setConditions }) => {
  const handleChange = (index, field, value) => {
    const updatedConditions = [...conditions];
    updatedConditions[index][field] = value;
    setConditions(updatedConditions);
  };

  const addCondition = () => {
    setConditions([
      ...conditions,
      { name: "", diagnosedDate: "", status: "", startDate: "", endDate: "" },
    ]);
  };

  const deleteCondition = (index) => {
    const updatedConditions = conditions.filter((_, i) => i !== index);
    setConditions(updatedConditions);
  };

  return (
    <div>
      <h3>Conditions</h3>
      {conditions.map((condition, index) => (
        <div key={index} className="card">
          <div className="card-body">
            <EditableField
              label="Condition Name"
              value={condition.name}
              onChange={(value) => handleChange(index, "name", value)}
            />
            <EditableField
              label="Diagnosed Date"
              value={condition.diagnosedDate}
              onChange={(value) => handleChange(index, "diagnosedDate", value)}
            />
            <EditableField
              label="Status"
              value={condition.status}
              onChange={(value) => handleChange(index, "status", value)}
            />
            <EditableField
              label="Start Date"
              value={condition.startDate}
              onChange={(value) => handleChange(index, "startDate", value)}
            />
            <EditableField
              label="End Date"
              value={condition.endDate}
              onChange={(value) => handleChange(index, "endDate", value)}
            />
            <button
              className="btn btn-danger"
              onClick={() => deleteCondition(index)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
      <button className="btn btn-primary" onClick={addCondition}>
        Add Condition
      </button>
    </div>
  );
};
