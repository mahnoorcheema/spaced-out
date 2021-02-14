import React, {useState} from "react";

const asParams = (params) =>
  new URLSearchParams(Object.entries(params));

const getArtist = async(name) => {
  try {
    const response = await fetch(`/api/artist?${asParams({name})}`);
    if (!response.ok) {
      throw new Error("Unable to fetch data")
    }
    return response.json();
  } catch (error){
    console.error(error)
  }
}

const ArtistSearch = ({onArtistFound}) => {
    const [artistQuery, setArtistQuery] = useState("");
    const handleSubmit = async event => {
        event.preventDefault()
        // Todo: Show list of artists
        const [firstArtist] = await getArtist(artistQuery)
        if (firstArtist)
            onArtistFound(firstArtist)
        else
            console.warn("No results found?!") // Todo: show message when no results
    };
    return (
        <form onSubmit={handleSubmit}>
            <label>
                Start Artist
                <input
                type="text"
                name="name"
                placeholder="eg. Grimes" 
                value={artistQuery}
                onChange={(event) => setArtistQuery(event.currentTarget.value)}/>
            </label>
            <button type="submit">Search!</button>
        </form>
    );
}

export default ArtistSearch;