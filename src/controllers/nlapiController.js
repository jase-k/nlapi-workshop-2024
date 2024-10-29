const fetch = require("node-fetch"); // Ensure you have node-fetch installed

const sendNlapiRequest = async (req, res) => {
  const { userInput, context, threadId } = req.body;

  try {
    const response = await fetch("https://api.nlapi.io/nlapi", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "nlapi-key": process.env.NLAPI_API_KEY,
      },
      body: JSON.stringify({
        user_input: userInput,
        context: context || [], // Optional context
        thread_id: threadId || null, // Optional thread ID
      }),
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error connecting to NLAPI:", error);
    res.status(500).json({ error: "Failed to connect to NLAPI" });
  }
};

module.exports = {
  sendNlapiRequest,
};
