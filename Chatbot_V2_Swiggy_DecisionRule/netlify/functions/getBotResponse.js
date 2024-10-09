// netlify/functions/getBotResponse.js
const fetch = require('node-fetch');

exports.handler = async (event) => {
    const body = JSON.parse(event.body);
    const apiUrl = process.env.API_URL_V2; // Use the environment variable

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            return {
                statusCode: response.status,
                body: JSON.stringify({ error: "Error fetching from API" })
            };
        }

        const data = await response.json();
        return {
            statusCode: 200,
            body: JSON.stringify(data)
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Server error" })
        };
    }
};