const btoa = require("btoa");
const fetch = require("node-fetch");



class SpotifyClient {
    static BASE_URL = `https://api.spotify.com`
    static EXPIRY_BUFFER = 1000;
    
    authToken = null;
    expiresAt = -Infinity;
    tokenRefreshPromise = null;

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
        return !this.authToken || this.expiresAt < Date.now();
    }

    async updateAccessToken() {
        if (this.tokenRefreshPromise) {
            return await this.tokenRefreshPromise;
        }
        
        this.tokenRefreshPromise = this.getAuthToken()
            .then(({ access_token: accessToken, expires_in: expiresInSeconds }) => { 
                this.authToken = accessToken;
                this.expiresAt = expiresInSeconds * 1000 + Date.now() + SpotifyClient.EXPIRY_BUFFER;
            });
        
        await this.tokenRefreshPromise;
        this.tokenRefreshPromise = null;
    }

    
    async fetchWithAuth(path, options = {}) { 
        if (this.isTokenExpired()) 
            await this.updateAccessToken();
        
        const url = path.startsWith(SpotifyClient.BASE_URL)
            ? path
            : `${SpotifyClient.BASE_URL}${path}`;
        
        const response = await fetch(url, {
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

    // https://developer.spotify.com/documentation/web-api/reference/#object-pagingobject
    async fetchAllWithAuth(path, options, allItems=[]) {
        const { next, items } = await this.fetchWithAuth(path, options);
        allItems.push(...items);
        if (next) 
            return await this.fetchAllWithAuth(next, options, allItems);
        return allItems;
    }

    isCompilation(album) {
        // Todo: Check for other similar names (Several artists, etc)
        return album.artists.some(({name}) => name.toLowerCase() === "various artists")
    }

    simplifyAlbum({id, name, images}) {
        return {
            id, name, images
        }
    }
    
    simplifyTrack({id, name}) {
        return {
            id, name
        };
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

    /**
     * https://developer.spotify.com/documentation/web-api/reference/#endpoint-get-an-artists-albums
     */
    async getAlbumsForArtist(artistId) {
        const params = new URLSearchParams();
        params.set("include_groups", "album,single")
        params.set("market", "US");
        params.set("limit", "50")
        const albums = await this.fetchAllWithAuth(`/v1/artists/${artistId}/albums?${params}`);
        console.log("Album count", albums.length);
        return albums.filter(album =>!this.isCompilation(album));
    }

    async getAlbumsDetailed(albumIds) {
        const params = new URLSearchParams();
        params.set("ids", albumIds);
        const { albums } = await this.fetchWithAuth(`/v1/albums?${params}`);
        return albums;
    }

    async getDetailedAlbumsForArtist(artistId) {
        const limit = 20
        const albums = await this.getAlbumsForArtist(artistId);
        // const albumIds = albums.map(album => album.id)
        const albumIds = [...new Map(albums.map(album => [album.name, album.id])).values()]
        let detailedAlbums = []
        for (let i = 0; i < albumIds.length; i+=limit){
             detailedAlbums = [...detailedAlbums, ...await this.getAlbumsDetailed(albumIds.slice(i, i + limit-1))]
        }
        return detailedAlbums;
    }
    /**
     * https://developer.spotify.com/documentation/web-api/reference/#endpoint-get-multiple-artists
     */
    async getArtistsDetailed(artistIds) {
        const params = new URLSearchParams();
        params.set("ids", artistIds)
        const { artists } = await this.fetchWithAuth(`/v1/artists?${params}`)
        return artists
    }

    async getFeaturedArtists(originArtistId) {
        const detailedAlbums = await this.getDetailedAlbumsForArtist(originArtistId);
        const connectedArtists = {};
        const limit = 50;
        
        const addToConnectedArtists = ({ artist, track, album }) => {
            if (!(artist.id in connectedArtists)) {
                connectedArtists[artist.id] = []
            }
            connectedArtists[artist.id].push({ artist, track, album });
        };

        detailedAlbums.forEach(album =>
            album.tracks.items.forEach(track => {
                const isConnected = track.artists.some(artist => artist.id === originArtistId)
                if (!isConnected) return;
                
                track.artists
                    .filter(artist => artist.id !== originArtistId)
                    .forEach(artist => addToConnectedArtists({artist, track, album}))
            })
        );
        
        const connectedArtistsIds = [...Object.keys(connectedArtists)]
    
        let artistDetails = [];
        for (let i = 0; i < connectedArtistsIds.length; i+=limit) {
            artistDetails = [...artistDetails, ...await this.getArtistsDetailed(connectedArtistsIds.slice(i, i + limit-1))];
        }
        
        return artistDetails.map(artist => ({
            artist,
            connectedTracks: connectedArtists[artist.id].map(({ track, album }) =>
            ({
                track: this.simplifyTrack(track),
                album: this.simplifyAlbum(album)
            }))
        }));
    }
}



module.exports = SpotifyClient;