const { sendNlapiRequest } = require('./nlapiController');
const fetch = require('node-fetch'); // Ensure you have node-fetch installed
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const handleSlackCallback = async (req, res) => {
    console.log(req.query);
    const { code, state } = req.query;
    console.log(code);
    console.log(state);
    
    // TODO: Validate the state in a more secure way Currently just checking if valid jwt token.
    // const storedState = req.session.oauthState;
    // if (!storedState || state !== storedState) {
    //     return res.status(400).send("Invalid state parameter");
  // }
    const userId = jwt.verify(state, process.env.JWT_SECRET).id;
  
    
    try {
        // Exchange the code for an access token
        console.log("exchanging code for access token");
        console.log(process.env.SLACK_CLIENT_ID);
        console.log(process.env.SLACK_CLIENT_SECRET);
        console.log(code);
        console.log(process.env.SLACK_REDIRECT_URI);
        const response = await fetch("https://slack.com/api/oauth.v2.access", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                client_id: process.env.SLACK_CLIENT_ID,
                client_secret: process.env.SLACK_CLIENT_SECRET,
                code: code,
                redirect_uri: process.env.SLACK_REDIRECT_URI,
            }),
        });
    
        const data = await response.json();
        console.log(data);
    
        if (!data.ok) {
            return res.status(400).send(`Error: ${data.error}`);
        }
    
        // Extract Slack user ID and access token
        const slackId = data.authed_user.id;
        const accessToken = data.access_token;
        console.log(slackId);
        console.log(accessToken);
    
        // Save to database: Associate slackId and accessToken with the logged-in user
        await User.update({ slackId: slackId }, { where: { id: userId } });
    
        // Redirect to React app with success
        res.redirect(`/dashboard?slackSuccess=true`);
    } catch (error) {
        console.error("Error during Slack OAuth:", error);
        res.status(500).send("Internal Server Error");
    }
};

// Function to handle incoming Slack webhooks
const handleSlackWebhook = async (req, res) => {
  try {
    const slackEvent = req.body.event;
    console.log(slackEvent);
    const slackUserId = slackEvent.user;
    const slackText = slackEvent.text;

    // Find the user based on Slack customer ID
    const user = await findUserBySlackId(slackUserId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Call the NLAPI controller with the user's JWT token and Slack text
    const nlapiResponse = await sendNlapiRequest({
      body: {
        userInput: slackText,
        context: [], // Add any context if needed
        threadId: null, // Add thread ID if needed
      },
      headers: {
        authorization: `Bearer ${user.jwtToken}`,
      },
    });

    // Send a response back to Slack using incoming webhook
    await sendResponseToSlack(slackEvent.response_url, nlapiResponse);

    res.sendStatus(200); // Acknowledge the Slack event
  } catch (error) {
    console.error('Error handling Slack webhook:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Function to find a user by their Slack ID
const findUserBySlackId = async (slackUserId) => {
  // Implement your logic to find a user by Slack ID
  // This could be a database query or an API call
  return {
    jwtToken: 'user-jwt-token', // Replace with actual JWT token retrieval
  };
};

// Function to send a response back to Slack
const sendResponseToSlack = async (responseUrl, message) => {
  await fetch(responseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text: message, // The message to send back to Slack
    }),
  });
};

module.exports = {
  handleSlackWebhook,
  handleSlackCallback,
};
