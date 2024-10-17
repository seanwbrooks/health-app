Scenario
You are working for a healthcare company that receives patients' health history data from a
third-party service. The goal is to parse this data, present it to the patient for review, reconcile
the reviewed data with the original, and store it in a database with the purpose of showcasing it
to a clinician to review.

System Overview
The system performs the following:

1. Calls a third party service API and retrieves health history data (JSON) from the service
2. Clean up and present the data for patients to review
3. Reconciles patient-reviewed data with the original
4. Stores the reconciled data in a database for clinician review

Areas of Focus

1. Data Parsing
   Write a parser that can process health history data (conditions, allergies, procedures,
   medications).

   This utility should validate procedures, medications, allergies, conditions, etc. We can use services, databases to validate medications or insurable conditions. The utility can be used for integration with 3rd party patient history provider and it could also be
   used within api or in frontend logic for patient input. Will need to ask.

2. Data Presentation
   Design an API endpoint to return parsed health history data for a patient and create a basic UI
   template to present this data in a user-friendly format to allow the user to make any edits.

   Patients will have the ability to review all their patient health history. The can
   update, remove or add to 4 objects of health history. I went with React components for
   the forms. There is a submit button that initiates api call to the api layer of application which can be on a server or serverless.

3. Data Reconciliation
   Create logic to reconcile the original data with patient-reviewed data. Handle conflicts, for
   example, prioritizing patient input on what might be considered subjective vs. objective.

   When I think of subjective vs. objective I think of patient (subjective) vs. clinician (objective), but it seems that patient data itself can be subjective, i.e. feeling, and objective. I will need a set of rules to complete the task, but I went with basic criteria, has it been reviewed or is original data new.

4. Data Storage:
   Design a database schema for storing reconciled health history data. Include thoughts on
   potential differences between patient views and clinician views.
   Feel free to outline your thought process, design, and any code snippets as appropriate. We will take the time during the interview to review your code and implementation.

   I have created database tables. The entity tables encompass patient health history. The reconciliation tables are used for clinician review of the data to be saved to patient
   views as the updates come in. The audit logs and user tables allow us to have versioning, a history of changes to patient information.
