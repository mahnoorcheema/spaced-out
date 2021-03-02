require("dotenv").config()
const SpotifyClient = require("./helpers/SpotifyClient");
const spotify = new SpotifyClient()

const main = async () => {
    const artistId = "06HL4z0CvFAxyc27GXpf02"
    const featuredArtists = await spotify.getFeaturedArtists(artistId)
    return featuredArtists;
}

 main()
    .then((data) => console.dir(data, {depth: Infinity}))
    .catch(console.error)