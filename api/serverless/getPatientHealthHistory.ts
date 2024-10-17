// Import AWS SDK
const AWS = require("aws-sdk");
const dynamoDb = new AWS.DynamoDB.DocumentClient();

const handler = async (event) => {
  // Get patientId from the request path parameters
  const patientId = event.pathParameters.patientId;

  const params = {
    TableName: "Patients", // Replace with your DynamoDB table name
    Key: {
      patientId: patientId,
    },
  };

  try {
    // Fetch data from DynamoDB
    const result = await dynamoDb.get(params).promise();

    // Check if data exists
    if (!result.Item) {
      return {
        statusCode: 404,
        body: JSON.stringify({
          message: `Patient with ID ${patientId} not found`,
        }),
      };
    }

    // Return the patient health history
    return {
      statusCode: 200,
      body: JSON.stringify(result.Item),
    };
  } catch (error) {
    console.error("Error fetching patient health history:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Internal server error while fetching patient data",
      }),
    };
  }
};
