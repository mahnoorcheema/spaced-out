require("dotenv").config()
const SpotifyClient = require("./helpers/SpotifyClient");
const express = require("express")
const app = express()
const spotify = new SpotifyClient();

const apiRouter = express.Router()

app.use(
    /**
     * @param {express.Request}
     * @param {express.Response}
     * @param {express.NextFunction}
     */
    (request, response, next) => {
        console.log("Got a request!", {
            url: request.url,
            method: request.method
        })
    next();
});

apiRouter.get("/artist", async (request, response) => {
    try {
        const { name } = request.query;
        if (!name)
            return response.status(422).send({ error: "No artist entered"});
        
        return response.send(await spotify.searchForArtist(name));
    } catch(error){
        console.error("Failed to get artist", error)
        return response.status(500).send({error: "Unknown error"});
    }
})

apiRouter.get("/related/:artistId", async (request, response) => {
    try {
        const { artistId } = request.params;
        return response.send(await spotify.getRelatedArtists(artistId))
    } catch (error) {
        console.error("Failed to get related artists", error);
        return response.status(500).send({ error: "Unknown error" });
    }
});

app.use("/api", apiRouter);

app.all("*", (request, response) =>
    response.status(404).send({ error: "Page not found" })
);

const port = process.env.EXPRESS_PORT;
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
});