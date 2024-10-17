import axios from "axios";
const NILE_HEALTH_API_URL = `https://api.nile-health.com`;

export const getPatientHealthHistory = async (patientId) => {
  try {
    const response = await axios.get(
      `${NILE_HEALTH_API_URL}/api/patient/${patientId}/health-history`
    );

    if (response.status === 200) {
      console.log("Data submitted successfully:", response.data);
    }

    return response.data;
  } catch (error) {
    console.error("Error submitting health history:", error);
  }
};

// Function to submit the reconciled health history
export const submitHealthHistory = async (patientId, healthHistory) => {
  try {
    const response = await axios.post(
      `${NILE_HEALTH_API_URL}/api/patient/${patientId}/health-history`,
      {
        patientId: healthHistory.patientId,
        healthHistory: healthHistory.healthHistory,
      }
    );

    if (response.status === 200) {
      console.log("Data submitted successfully:", response.data);
    }
  } catch (error) {
    console.error("Error submitting health history:", error);
  }
};
