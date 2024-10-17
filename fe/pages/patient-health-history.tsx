import React, { useState, useEffect } from "react";
import { ConditionsForm } from "../components/forms/conditions";
import { AllergiesForm } from "../components/forms/allergies";
import { ProceduresForm } from "../components/forms/procedures";
import { MedicationsForm } from "../components/forms/medications";
import * as api from "../api/patient-health-history";

const PatientForm: React.FC = ({ data }) => {
  const [conditions, setConditions] = useState([]);
  const [allergies, setAllergies] = useState([]);
  const [procedures, setProcedures] = useState([]);
  const [medications, setMedications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    api
      .getPatientHealthHistory(data.patientId)
      .then((res) => {
        setConditions(res.healthHistory.conditions);
        setAllergies(res.healthHistory.allergies);
        setProcedures(res.healthHistory.procedures);
        setMedications(res.healthHistory.medications);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, [data.patientId]);

  const submitForm = () => {
    setLoading(true);
    api
      .submitHealthHistory(data.patientId, {
        conditions,
        allergies,
        procedures,
        medications,
      })
      .then(() => {
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  };

  return (
    <div className="container">
      <h2>Patient ID: {data.patientId}</h2>

      <ConditionsForm conditions={conditions} setConditions={setConditions} />
      <AllergiesForm allergies={allergies} setAllergies={setAllergies} />
      <ProceduresForm procedures={procedures} setProcedures={setProcedures} />
      <MedicationsForm
        medications={medications}
        setMedications={setMedications}
      />
      {error && <label style={{ color: "red" }}>{error}</label>}
      <button
        onSubmit={(e) => {
          e.preventDefault();
          submitForm();
        }}
        disabled={loading}
      >
        Submit Forms
      </button>
    </div>
  );
};

export default PatientForm;
