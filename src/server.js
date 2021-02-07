require("dotenv").config()
const SpotifyClient = require("./helpers/SpotifyClient");
const express = require("express")
const app = express()
const spotify = new SpotifyClient();

app.get("/artist", async (request, response) => {
    try {
        const { name } = request.query;
        response.send(await spotify.searchForArtist(name))
    } catch(error){
        console.error("Failed to get artist", error)
        response.status(500).send({message: "Unknown error"});
    }
})

app.get("/related/:artistId", async (request, response) => {
    try {
        const { artistId } = request.params;
        response.send(await spotify.getRelatedArtists(artistId))
    } catch (error) { 
        console.error("Failed to get related artists", error);
        response.status(500).send({message: "Unknown error"});
    }
})

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
});