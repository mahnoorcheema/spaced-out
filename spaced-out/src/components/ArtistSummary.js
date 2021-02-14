import React from "react"


/**
 * @param {Object} props
 * @param {Artist} props.artist
 */
const ArtistSummary = ({artist}) => {
    return (
        <div>
            <p>{artist.name}</p>
            <img src={artist.images[0].url} alt={artist.name}/>
        </div>
    )
}

export default ArtistSummary;