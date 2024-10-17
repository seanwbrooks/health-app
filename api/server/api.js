const express = require("express");
const app = express();
const db = "some-db-sdk";
import * as parser from "../../utils/parser";
import * as reconciler from "../../utils/reconciler";

const THIRD_PARTY_URL = "https://athenahealth.com";
// There are many ways to build an API, but I went with Node Express Server that is light-weight
// We could go serverless here and build an API using AWS API Gateway. This file would be a handler
// function in the runtime of our choice, i.e. Go, Node, Ruby, etc.  Please see serverless folder as example.

// Sample function that retrieves health history data from a database
const getPatientHealthHistory = (patientId) => {
  // In a real application, you'd query the database.
  // For now, we're using static data.
};

// Route to get parsed patient health history data from 3rd party
app.get(`/api/patient/:patientId/health-history`, (req, res) => {
  try {
    const response = await fetch(`${THIRD_PARTY_URL}/api/patient/${req.patientId}`, {
      method: GET,
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-API-KEY": process.env.THIRD_PARTY_API_KEY,
    });

    if (!response.ok) {
      const message = await response.text();
      console.error(message);
      throw new Error(message);
    }

    const json = await response.json();

    // parse 3rd party data
    const parsedData = parser(json);

    res.json(parsedData);
  } catch (err) {
    // Error handling
  }

  
});

// Route to get parsed health history data from DB
app.get("/api/clinician/:clinicianId/patient/:patientId/health-history", (req, res) => {
  const patientId = req.params.patientId;
  // There would be some database connector here that would search database
  // I'm just writing DB query to retrieve appropriate data that will need to be formatted
  // before we send to frontend
  const healthHistory = db.query(
    `SELECT 
    p.patient_id,
    p.name AS patient_name,
    p.dob AS patient_dob,

    -- Medications
    m.medication_id,
    m.name AS medication_name,
    m.dosage AS medication_dosage,
    m.frequency AS medication_frequency,
    m.start_date AS medication_start_date,
    m.end_date AS medication_end_date,

    -- Allergies
    a.allergy_id,
    a.name AS allergy_name,
    a.severity AS allergy_severity,
    a.reaction AS allergy_reaction,

    -- Conditions
    c.condition_id,
    c.name AS condition_name,
    c.diagnosed_date AS condition_diagnosed_date,
    c.status AS condition_status,
    c.start_date AS condition_start_date,
    c.end_date AS condition_end_date,

    -- Procedures
    pr.procedure_id,
    pr.name AS procedure_name,
    pr.date AS procedure_date,
    pr.category AS procedure_category,
    pr.start_date AS procedure_start_date,
    pr.end_date AS procedure_end_date

FROM 
    Patient p

    -- Join Medications
    LEFT JOIN Medications m ON p.patient_id = m.patient_id

    -- Join Allergies
    LEFT JOIN Allergies a ON p.patient_id = a.patient_id

    -- Join Conditions
    LEFT JOIN Conditions c ON p.patient_id = c.patient_id

    -- Join Procedures
    LEFT JOIN Procedures pr ON p.patient_id = pr.patient_id

WHERE 
    p.patient_id = ${patientId};`
  );

  // We need to format the query into JSON for frontend
  const formattedHealthHistory = formatter(healthHistory);

  res.json(formattedHealthHistory);
});

app.post("/api/patient/:patientId/health-history", (req, res) => {
  // Reconcile patient submitted data to clinician
  const reconciledHealthHistory = reconciler.reconcileHealthHistory(
    req.healthHistory
  );

  // Save the reconciled patient data into database
  db.query("some query using original health history data to store in entities tables")
  db.query("some query using reconciled health history data to store in reconciliation log so clinician can review");


  res.json(healthHistory);
});

// Server setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
