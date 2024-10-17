export interface Condition {
  name: string;
  diagnosedDate: string | null; // A date string or empty/null
  status: "Active" | "Resolved" | "Unknown"; // Enum-like for possible statuses
  startDate: string | null; // A date string or null
  endDate: string | null; // A date string or null
}

export interface Allergy {
  name: string;
  severity?: "Low" | "Moderate" | "High"; // Optional, severity might not always exist
  reaction: string;
}

export interface Procedure {
  name: string;
  date: string | null; // Date of the procedure, can be invalid/null
  category?: string; // Optional for dental or other procedures
  startDate: string | null; // Start date of the procedure
  endDate: string | null; // End date of the procedure
}

export interface Medication {
  name: string;
  dosage: string; // Could be "INVALID DOSAGE", so keeping it string
  frequency: string; // Frequency could have a format like "UNKNOWN"
  startDate: string | null;
  endDate: string | null;
}

export interface HealthHistory {
  conditions: Condition[];
  allergies: Allergy[];
  procedures: Procedure[];
  medications: Medication[];
}

export interface PatientHealthHistory {
  patientId: string;
  healthHistory: HealthHistory;
}
