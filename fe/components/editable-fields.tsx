export const EditableField = ({ label, value, onChange }) => (
  <div className="form-group">
    <label>{label}</label>
    <input
      type="text"
      className="form-control"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);
