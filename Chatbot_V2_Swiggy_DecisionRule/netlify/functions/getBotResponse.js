// netlify/functions/getBotResponse.js

//const fetch = require('node-fetch');    :will give error in netlify

exports.handler = async (event) => {
    // Dynamically import node-fetch
    const fetch = (await import('node-fetch')).default;

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
                headers: {
                    "Access-Control-Allow-Origin": "*", // Allow requests from any origin
                },
                body: JSON.stringify({ error: "Error fetching from API" })
            };
        }

        const data = await response.json();
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*", // Allow requests from any origin
            },
            body: JSON.stringify(data)
        };
    } catch (error) {
        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "*", // Allow requests from any origin
            },
            body: JSON.stringify({ error: "Server error" })
        };
    }
};