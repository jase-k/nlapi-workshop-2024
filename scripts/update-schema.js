const fetch = require('node-fetch');
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const FormData = require('form-data');

const loginUrl = "https://api.nlapi.io/portal/sessions/login";

const loginAndUploadSchema = async () => {
  const schemaName = process.env.NLAPI_SCHEMA_NAME;
  const swaggerPath = path.join(__dirname, `../${schemaName}.swagger.json`);
  const applicationId = process.env.NLAPI_APPLICATION_ID;

  try {
    // Login to get the token
    const loginResponse = await fetch(loginUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: process.env.NLAPI_DEV_USER,
        password: process.env.NLAPI_DEV_PASSWORD,
      }),
    });

    if (!loginResponse.ok) {
      console.log(loginResponse);
      throw new Error("Failed to login");
    }

    const loginData = await loginResponse.json();
    const token = loginData.access_token;

    const formData = new FormData();
    formData.append('application_id', applicationId);
    formData.append('name', schemaName);
    formData.append('file', fs.createReadStream(swaggerPath));

    // Upload the schema
    const response = await fetch("https://api.nlapi.io/portal/schemas", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        ...formData.getHeaders()
      },
      body: formData,
    });

    if (!response.ok) {
      console.log("response", await response.json());
      throw new Error("Failed to upload schema");
    }

    const data = await response.json();
    console.log("Schema uploaded successfully:", data.message);
  } catch (error) {
    console.error('Error uploading schema:', error);
  }
};

loginAndUploadSchema();
