import React, {useState, useEffect} from "react";
import { getArtist } from "../helpers/api-helpers";
import useDebouncedState from "../hooks/useDebouncedState"

const noCleanup = () => { };

const ArtistSearch = ({ onArtistFound }) => {
    const [artistQueryDraft, setArtistQueryDraft] = useState("");
    const [artistQuery, setArtistQueryDebounced, setArtistQueryImmediate] = useDebouncedState("", 100);
    const [searchResults, setSearchResults] = useState(null);

    useEffect(() => {
        if (!artistQuery.trim()) return noCleanup;
        
        let isDisconnected = false;
        getArtist(artistQuery).then(artists => {
            if (isDisconnected) return;

            if (artists.length === 1)
                handleSelectArtist(artists[0]);
            else
                setSearchResults(artists.slice(0, 7));
        });
        return () => isDisconnected = true;
    }, [artistQuery])

    const handleSelectArtist = (artist) => {
        setArtistQueryDraft(artist.name);
        onArtistFound(artist);
        setSearchResults(null);
    };

    return (
        <div className="searchbar--container">
            <form
                className="searchbar" 
                onSubmit={event => {
                    event.preventDefault();
                    setArtistQueryImmediate(artistQueryDraft);
                    if (searchResults?.length > 0) {
                        handleSelectArtist(searchResults[0])
                    }
                }}>
        
                <input
                    required
                    className="searchbar--input"
                    type="text"
                    name="name"
                    autoComplete="off"
                    placeholder="eg. Grimes"
                    value={artistQueryDraft}
                    aria-label="search for artist"
                    onChange={(event) => {
                        const { value } = event.currentTarget;
                        setArtistQueryDraft(value);
                        setArtistQueryDebounced(value);
                    }}
                    onBlur={(event) => setArtistQueryImmediate(event.currentTarget.value)}
                />
                <button className="searchbar--btn fas fa-search" type="submit" aria-label="submit search"></button>
            </form>
            <div className="searchbar-no-results">
                {searchResults?.length === 0 && <p>No results found</p>}
            </div>
            <ol className="searchbar-suggestions--ol">
                {searchResults?.map(artist => <li key={artist.id}>
                    <button className="searchbar-suggestions--button" onClick={() => handleSelectArtist(artist)}>
                        {artist.images[0] && <img className="searchbar-suggestions--img__circle" src={artist.images[0].url}></img>}
                        <div className="searchbar-suggestions--artistname">{artist.name}</div>
                    </button>
                </li>)}
            </ol>
        </div>
    );
}

export default ArtistSearch;