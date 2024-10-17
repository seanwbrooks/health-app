// Helper to determine if a field is subjective or objective
const isSubjectiveField = (field) => {
  const subjectiveFields = ["status", "severity", "reaction"];
  return subjectiveFields.includes(field);
};

// Conflict resolution logic
const reconcileData = (originalData, reviewedData) => {
  // Create a deep copy of the original data to avoid mutating it
  const reconciledData = JSON.parse(JSON.stringify(originalData));

  // Reconcile conditions
  const reconcileConditions = () => {
    const reconciledConditions = reviewedData.healthHistory.conditions.map(
      (reviewedCondition, index) => {
        const originalCondition = originalData.healthHistory.conditions[index];
        let reconciledCondition = { ...originalCondition };

        Object.keys(reviewedCondition).forEach((field) => {
          if (reviewedCondition[field] !== originalCondition[field]) {
            if (isSubjectiveField(field)) {
              // For subjective fields, prioritize patient's input
              reconciledCondition[field] = reviewedCondition[field];
            } else {
              // For objective fields, if patient's data conflicts, flag it for review
              reconciledCondition[field] = reviewedCondition[field];
              reconciledCondition.conflict = true;
            }
          }
        });

        return reconciledCondition;
      }
    );

    return reconciledConditions;
  };

  // Reconcile allergies
  const reconcileAllergies = () => {
    const reconciledAllergies = reviewedData.healthHistory.allergies.map(
      (reviewedAllergy, index) => {
        const originalAllergy = originalData.healthHistory.allergies[index];
        let reconciledAllergy = { ...originalAllergy };

        Object.keys(reviewedAllergy).forEach((field) => {
          if (reviewedAllergy[field] !== originalAllergy[field]) {
            if (isSubjectiveField(field)) {
              reconciledAllergy[field] = reviewedAllergy[field];
            } else {
              reconciledAllergy[field] = reviewedAllergy[field];
              reconciledAllergy.conflict = true;
            }
          }
        });

        return reconciledAllergy;
      }
    );

    return reconciledAllergies;
  };

  // Reconcile procedures
  const reconcileProcedures = () => {
    const reconciledProcedures = reviewedData.healthHistory.procedures.map(
      (reviewedProcedure, index) => {
        const originalProcedure = originalData.healthHistory.procedures[index];
        let reconciledProcedure = { ...originalProcedure };

        Object.keys(reviewedProcedure).forEach((field) => {
          if (reviewedProcedure[field] !== originalProcedure[field]) {
            // Assume that procedures have mostly objective fields (dates, names)
            reconciledProcedure[field] = reviewedProcedure[field];
            reconciledProcedure.conflict = true;
          }
        });

        return reconciledProcedure;
      }
    );

    return reconciledProcedures;
  };

  // Reconcile medications
  const reconcileMedications = () => {
    const reconciledMedications = reviewedData.healthHistory.medications.map(
      (reviewedMedication, index) => {
        const originalMedication =
          originalData.healthHistory.medications[index];
        let reconciledMedication = { ...originalMedication };

        Object.keys(reviewedMedication).forEach((field) => {
          if (reviewedMedication[field] !== originalMedication[field]) {
            // Assume dosage and frequency are objective
            reconciledMedication[field] = reviewedMedication[field];
            reconciledMedication.conflict = true;
          }
        });

        return reconciledMedication;
      }
    );

    return reconciledMedications;
  };

  // Updating the reconciled data with conflicts resolved
  reconciledData.healthHistory.conditions = reconcileConditions();
  reconciledData.healthHistory.allergies = reconcileAllergies();
  reconciledData.healthHistory.procedures = reconcileProcedures();
  reconciledData.healthHistory.medications = reconcileMedications();

  return reconciledData;
};

// Sample data for original and reviewed
const originalData = {
  patientId: "12345",
  healthHistory: {
    conditions: [
      {
        name: "Type 2 Diabetes",
        diagnosedDate: "2018-03-15",
        status: "Active",
        startDate: "2018-03-15",
        endDate: null,
      },
      {
        name: "Hypertension",
        diagnosedDate: "",
        status: "Unknown",
        startDate: "2019-07-22",
        endDate: null,
      },
    ],
    allergies: [{ name: "Penicillin", severity: "Moderate", reaction: "Rash" }],
    procedures: [
      {
        name: "Appendectomy",
        date: "2015-11-03",
        startDate: "2015-11-03",
        endDate: null,
      },
    ],
    medications: [
      {
        name: "metformin",
        dosage: "500 mg",
        frequency: "Twice daily",
        startDate: "2018-03-20",
        endDate: null,
      },
    ],
  },
};

const reviewedData = {
  patientId: "12345",
  healthHistory: {
    conditions: [
      {
        name: "Type 2 Diabetes",
        diagnosedDate: "2018-03-15",
        status: "Resolved",
        startDate: "2018-03-15",
        endDate: null,
      },
      {
        name: "Hypertension",
        diagnosedDate: "",
        status: "Active",
        startDate: "2019-07-22",
        endDate: null,
      },
    ],
    allergies: [
      { name: "Penicillin", severity: "High", reaction: "Anaphylaxis" },
    ],
    procedures: [
      {
        name: "Appendectomy",
        date: "2015-11-03",
        startDate: "2015-11-03",
        endDate: null,
      },
    ],
    medications: [
      {
        name: "metformin",
        dosage: "500 mg",
        frequency: "Twice daily",
        startDate: "2018-03-20",
        endDate: null,
      },
    ],
  },
};

// Example usage
const reconciledData = reconcileData(originalData, reviewedData);
console.log(reconciledData);
