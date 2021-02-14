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