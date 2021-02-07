require('dotenv').config()
const SpotifyClient = require("./helpers/SpotifyClient");

const main = async () => {
    const spotify = new SpotifyClient();
    const [{ id: artistId }] = await spotify.searchForArtist("Woodkid")
    const relatedArtists = await spotify.getRelatedArtists(artistId);
    
    return relatedArtists;
};

main()
    .then(console.log)
    .catch(console.error)

