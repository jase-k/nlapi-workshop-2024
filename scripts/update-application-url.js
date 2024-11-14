const fetch = require("node-fetch");
require('dotenv').config();

const API_URL = "CHANGE_ME.com"; // Replace with the actual new API URL

const loginUrl = "https://api.nlapi.io/portal/sessions/login";
const updateUrl = `https://api.nlapi.io/portal/applications/${process.env.NLAPI_APPLICATION_ID}`;

const loginAndUpdateApplicationUrl = async () => {
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

    // Update the application URL
    const updateResponse = await fetch(updateUrl, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        api_url: API_URL,
      }),
    });

    if (!updateResponse.ok) {
      console.log(updateResponse);
      throw new Error("Failed to update application URL");
    }

    const updateData = await updateResponse.json();
    console.log("Application URL updated successfully:", updateData);
  } catch (error) {
    console.error("Error:", error);
  }
};

loginAndUpdateApplicationUrl();
