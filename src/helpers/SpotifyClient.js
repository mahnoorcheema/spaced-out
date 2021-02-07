const btoa = require("btoa");
const fetch = require("node-fetch");


class SpotifyClient {
    static BASE_URL = `https://api.spotify.com`
    authToken = null;
    
    constructor() { 

    }

    async getAuthToken ({
        grantType = process.env.GRANT_TYPE,
        clientSecret = process.env.CLIENT_SECRET,
        clientId = process.env.CLIENT_ID
    } = {}) {
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
    
    isTokenExpired() {
        // Todo: track expiry time
        return !this.authToken
    }

    async updateAccessToken() {
        // Todo: track expiry time
        const {access_token} = await this.getAuthToken()
        this.authToken = access_token;
    }

    
    async fetchWithAuth(path, options = {}) { 
        if (this.isTokenExpired()) {
            await this.updateAccessToken();
        }
        const response = await fetch(`${SpotifyClient.BASE_URL}${path}`, {
            ...options,
            headers: {
                ...options.headers,
                "Authorization": `Bearer ${this.authToken}`
            }
        });
        if (!response.ok) 
            throw new Error(`Spotify request failed with ${response.status}`)
        
        return await response.json();
    }

    /**
     * https://developer.spotify.com/documentation/web-api/reference/#category-search
     */
    async searchForArtist(artistName) {
        const params = new URLSearchParams();
        params.set("q", artistName)
        params.set("type", "artist")
        const { artists } = await this.fetchWithAuth(`/v1/search?${params}`)
        return artists.items
        
    }

    /**
     * https://developer.spotify.com/documentation/web-api/reference/#endpoint-get-an-artists-related-artists
     */
    async getRelatedArtists(artistId) {
        const { artists } = await this.fetchWithAuth(`/v1/artists/${artistId}/related-artists`);
        return artists;
    }
}


module.exports = SpotifyClient;