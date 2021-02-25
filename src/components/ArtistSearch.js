import React, {useState, useEffect} from "react";
import { getArtist } from "../helpers/api-helpers";
import useDebouncedState from "../hooks/useDebouncedState"

const noCleanup = () => { };

const ArtistSearch = ({ onArtistFound }) => {
    const [artistQueryDraft, setArtistQueryDraft] = useState("");
    const [artistQuery, setArtistQueryDebounced, setArtistQueryImmediate] = useDebouncedState("", 500);
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
                }}>
        
                <input
                    required
                    className="searchbar--input"
                    type="text"
                    name="name"
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
            <ol className="searchbar-suggestions--ol">
                {searchResults?.map(artist => <li key={artist.id}>
                    <button className="searchbar-suggestions--button" onClick={() => handleSelectArtist(artist)}>{artist.name}</button>
                </li>)}
            </ol>
            {searchResults?.length === 0 && <p>No results found</p>}
        </div>
    );
}

export default ArtistSearch;