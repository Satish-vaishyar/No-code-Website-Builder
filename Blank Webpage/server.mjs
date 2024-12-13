import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors()); // Enable CORS for all routes
app.use(express.json());

// Root route to handle the base URL
app.get('/', (req, res) => {
    res.send('Proxy server is running. Use the /proxy endpoint to make API requests.');
});

app.post('/proxy', async (req, res) => {
    const apiKey = 'xai-TthzrcVMus29ubYrsVw6JBXDcqd15PP1oLC8gUvZ6t5YkKZaeOn1yb1MKAngoLNVboSUwT2Tf6qtbg7v';
    const apiUrl = 'https://api.x.ai/v1/chat/completions';

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify(req.body)
        });

        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data' });
    }
});

app.listen(port, () => {
    console.log(`Proxy server running at http://localhost:${port}`);
});