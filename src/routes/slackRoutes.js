const express = require('express');
const router = express.Router();
const { handleSlackWebhook, handleSlackCallback } = require('../controllers/slackController');

// Route to handle incoming Slack webhooks
router.post('', handleSlackWebhook);

router.get('/callback', handleSlackCallback);


module.exports = router;
