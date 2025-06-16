const express = require('express');
const router = express.Router();
const chatwithResume = require('../chat');

router.post('/chat', async (req, res) => {
    const { question } = req.body;

    try {
        const answer = await chatwithResume(question);
        res.json({ answer });
    }
    catch (err) {
        console.error('Error processing chat request:', err);
        res.status(500).json({error: 'An error occurred while processing your request.' });
    }
});

module.exports = router;