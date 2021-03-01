const asParams = (params) =>
  new URLSearchParams(Object.entries(params));


export const getArtist = async(name) => {
    const response = await fetch(`/api/artist?${asParams({name})}`);
    if (!response.ok)
        throw new Error(`Failed to search for artist named "${name}"`);
    return response.json();
};


export const getRelatedArtists = async(artistId) => {
    const response = await fetch(`/api/related/${artistId}`);
    if (!response.ok)
        throw new Error(`Failed to get related artists to ${artistId}`)
    return response.json()
}

export const getAlbumsForArtist = async(artistId) => {
    const response = await fetch(`/api/albums/${artistId}`)
    if (!response.ok)
        throw new Error(`Failed to get related artists to ${artistId}`)
    return response.json()
}

export const getMultipleAlbums = async(ids) => {
    const response = await fetch(`/api/multipleAlbums?${asParams({ids})}`)
    if (!response.ok)
        throw new Error(`Failed to get albums with ids: ${ids}`)
    return response.json()
}

export const getMultipleArtists = async(ids) => {
    const response = await fetch(`/api/multipleArtists?${asParams({ids})}`)
    if (!response.ok)
        throw new Error(`Failed to get artists with ids: ${ids}`)
    return response.json()
}

export const getFeaturedArtists = async(artistId) => {
    const response = await fetch(`api/featured-artists/${artistId}`)
    if (!response.ok)
        throw new Error(`Failed to get featured artists with artistId: ${artistId}`)
    return response.json()
}