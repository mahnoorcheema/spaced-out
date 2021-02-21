import React, {useState} from "react";
import { getArtist } from "../helpers/api-helpers";

const ArtistSearch = ({onArtistFound}) => {
    const [artistQuery, setArtistQuery] = useState("");
    const [searchResults, setSearchResults] = useState(null);

    const handleSelectArtist = (artist) => {
        setArtistQuery(artist.name);
        onArtistFound(artist);
        setSearchResults(null);
    };

    const handleSubmit = async event => {
        event.preventDefault();
        const artists = await getArtist(artistQuery);
        if (artists.length === 1) { 
            handleSelectArtist(artists[0]);
        } else {
            setSearchResults(artists);
        }
    };
    return (
        <div>
            <form className="form--searchbar"onSubmit={handleSubmit}>
                <label>
                    Start Artist:&nbsp; 
                    <input
                        required
                        className="input--searchbar"
                        type="text"
                        name="name"
                        placeholder="eg. Grimes" 
                        value={artistQuery}
                        onChange={(event) => setArtistQuery(event.currentTarget.value)}/>
                </label>
                <button className="btn--searchbar" type="submit">Search!</button>
            </form>
            <ul>
                {searchResults?.map(artist => <li key={artist.id}>
                    <button onClick={() => handleSelectArtist(artist)}>{artist.name}</button>
                </li>)}
            </ul>
            {searchResults?.length === 0 && <p>No results found</p>}
        </div>
    );
}

export default ArtistSearch;