import React, {useState} from "react";
import { getArtist } from "../helpers/api-helpers";

const getRandomColour = () => {
    const colours = ["#03003559", "#03F06543", "#032FBF71"]
    const randomColour = colours[Math.floor(Math.random() * colours.length)]
    console.log(randomColour)
    document.body.style.setProperty('--bg', randomColour)
}


const ArtistSearch = ({onArtistFound}) => {
    const [artistQuery, setArtistQuery] = useState("");
    const [searchResults, setSearchResults] = useState(null)
    const handleSubmit = async event => {
        event.preventDefault()
        getRandomColour()
        setSearchResults(await getArtist(artistQuery))
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
                    <button onClick={() => {
                        setArtistQuery(artist.name);
                        onArtistFound(artist)
                        setSearchResults(null);
                    }}>{artist.name}</button>
                </li>)}
            </ul>
            {searchResults?.length === 0 && <p>No results found</p>}
        </div>
    );
}

export default ArtistSearch;