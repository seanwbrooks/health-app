import { EditableField } from "../editable-fields";

export const ProceduresForm = ({ procedures, setProcedures }) => {
  const handleChange = (index, field, value) => {
    const updatedProcedures = [...procedures];
    updatedProcedures[index][field] = value;
    setProcedures(updatedProcedures);
  };

  const addProcedure = () => {
    setProcedures([
      ...procedures,
      { name: "", date: "", startDate: "", endDate: "" },
    ]);
  };

  const deleteProcedure = (index) => {
    const updatedProcedures = procedures.filter((_, i) => i !== index);
    setProcedures(updatedProcedures);
  };

  return (
    <div>
      <h3>Procedures</h3>
      {procedures.map((procedure, index) => (
        <div key={index} className="card">
          <div className="card-body">
            <EditableField
              label="Procedure Name"
              value={procedure.name}
              onChange={(value) => handleChange(index, "name", value)}
            />
            <EditableField
              label="Date"
              value={procedure.date}
              onChange={(value) => handleChange(index, "date", value)}
            />
            <EditableField
              label="Start Date"
              value={procedure.startDate}
              onChange={(value) => handleChange(index, "startDate", value)}
            />
            <EditableField
              label="End Date"
              value={procedure.endDate}
              onChange={(value) => handleChange(index, "endDate", value)}
            />
            <button
              className="btn btn-danger"
              onClick={() => deleteProcedure(index)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
      <button className="btn btn-primary" onClick={addProcedure}>
        Add Procedure
      </button>
    </div>
  );
};

export default ProceduresForm;
