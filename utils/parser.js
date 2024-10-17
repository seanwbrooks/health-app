// Function to parse and validate conditions
function parseConditions(conditions) {
  return conditions.filter((condition) => {
    const isValidName = condition?.name !== "JUNK DATA";
    const isValidDiagnosedDate =
      !condition.diagnosedDate || !isNaN(Date.parse(condition.diagnosedDate));
    const isValidStatus = condition?.status !== "Unknown";
    return isValidName && isValidDiagnosedDate && isValidStatus;
  });
}

// Function to parse and validate allergies
function parseAllergies(allergies) {
  return allergies.filter((allergy) => {
    const isValidName = allergy?.name !== "INVALID ALLERGY DATA";
    const isValidReaction = allergy?.reaction !== "JUNK REACTION";
    return isValidName && isValidReaction;
  });
}

// Function to parse and validate procedures
function parseProcedures(procedures) {
  return procedures.filter((procedure) => {
    const isValidName = procedure?.name !== "UNKNOWN PROCEDURE";
    const isValidDate = procedure.date && !isNaN(Date.parse(procedure.date));
    return isValidName && isValidDate;
  });
}

// Function to parse and validate medications
function parseMedications(medications) {
  return medications.filter((medication) => {
    const isValidName = medication?.name !== "INVALID MEDICATION";
    const isValidDosage =
      medication.dosage &&
      medication.dosage !== "INVALID DOSAGE" &&
      medication.dosage !== "UNKNOWN DOSAGE";
    const isValidFrequency = medication?.frequency !== "UNKNOWN";
    return isValidName && isValidDosage && isValidFrequency;
  });
}

// Function to parse the entire health history
export function parseHealthHistory(healthHistory) {
  return {
    conditions: parseConditions(healthHistory.conditions),
    allergies: parseAllergies(healthHistory.allergies),
    procedures: parseProcedures(healthHistory.procedures),
    medications: parseMedications(healthHistory.medications),
  };
}

// Parsing the health history data
const parsedHealthHistory = parseHealthHistory(sampleData.healthHistory);
console.log(parsedHealthHistory);
