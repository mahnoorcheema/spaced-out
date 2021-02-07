require('dotenv').config()
const btoa = require("btoa");
const fetch = require("node-fetch");


const getAuthToken = async ({
    grantType = process.env.GRANT_TYPE,
    clientSecret = process.env.CLIENT_SECRET,
    clientId = process.env.CLIENT_ID
} = {}) => {
    const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        body: `grant_type=${grantType}`,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": `Basic ${btoa(`${clientId}:${clientSecret}`)}`
        }
    });
    if (!response.ok) 
        throw new Error(`Failed to get auth token ${response.status}`);
    
    return await response.json();
}

getAuthToken()
    .then(console.log)
    .catch(console.error)