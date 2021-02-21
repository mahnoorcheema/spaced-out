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
    const handleSubmit = async event => {
        event.preventDefault()
        getRandomColour()
        // Todo: Show list of artists
        const [firstArtist] = await getArtist(artistQuery)
        if (firstArtist)
            onArtistFound(firstArtist)
        else
            console.warn("No results found?!") // Todo: show message when no results
    };
    return (
        <form className="form--searchbar"onSubmit={handleSubmit}>
            <label>
                Start Artist:&nbsp; 
                <input
                    className="input--searchbar"
                    type="text"
                    name="name"
                    placeholder="eg. Grimes" 
                    value={artistQuery}
                    onChange={(event) => setArtistQuery(event.currentTarget.value)}/>
            </label>
            <button className="btn--searchbar" type="submit">Search!</button>
        </form>
    );
}

export default ArtistSearch;