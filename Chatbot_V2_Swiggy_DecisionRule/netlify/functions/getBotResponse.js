// netlify/functions/getBotResponse.js
const API_URL = process.env.API_URL_V2;

exports.handler = async (event) => {
    const api_body = JSON.parse(event.body);

    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(api_body)
    });

    if (!response.ok) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Network response was not ok' }),
        };
    }

    const data = await response.json();
    return {
        statusCode: 200,
        body: JSON.stringify(data),
    };
};