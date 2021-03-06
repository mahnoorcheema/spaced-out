import React, { useState } from "react"
import {getRelatedArtists, getFeaturedArtists} from "../helpers/api-helpers"
import {useSeenArtists} from "../contexts/SeenArtistsContext"
import { getSmallestImage } from "../helpers/spotify-helpers";
import TrackDetails from "./TrackDetails";


const getBackgroundColor = (depth) => {
    const hue = 20 * depth
    const saturation = 70
    const lightness = 60
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`
}

const getFontColor = (depth) => {
    const hue = (500 * depth ) + 120
    // const hue = (20 * depth) + 50
    const saturation = 100
    const lightness = 90
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`
}

const getOverlayColor = (depth) => {
    // const hue = (1000 * depth ) + 120
    const hue = (500 * depth) + 60
    const saturation = 100
    const lightness = 90
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`
}

/**
 * @param {Object} props
 * @param {Artist} props.artist
 * @param {ConnectedTrack} props.connectedTracks
 * @param {number} props.depth
 */
const ArtistSummary = ({ artist, connectedTracks, depth=1 }) => {
    /** @type{[(ArtistSummary[] | null), Function]} */
    const [relatedArtists, setRelatedArtists] = useState(null)
    const {isArtistsUnique, addToSeenArtists} = useSeenArtists()
    
    const handleGetRelatedArtists = async () => {
        const allRelatedArtists = await getFeaturedArtists(artist.id)
        const uniqueRelatedArtists = allRelatedArtists.filter(isArtistsUnique)
        uniqueRelatedArtists.forEach(addToSeenArtists)
        setRelatedArtists(uniqueRelatedArtists)
    }

    const smallestImage = getSmallestImage(artist.images);
    const smallestAlbumImage = connectedTracks ? getSmallestImage(connectedTracks[0].album.images) : null
 return (
        <div id="tree">
            <div style={{backgroundColor: getBackgroundColor(depth)}}>
                <div className="artist-container">
                    <h2 className="artist-name" style={{color: getFontColor(depth)}}>{artist.name.toUpperCase()}</h2>
                    <div className="artist-art overlay color" style={{"--toneTwo": getOverlayColor(depth)}}>
                        {smallestImage ? <img className="artist-art--img" src={smallestImage.url} alt=""/> : <div className="artist-art--img no-img-block">A</div>}
                    </div>
                    <h2 className="artist-name-outline" style={{"--strokeColor": getFontColor(depth)}}>{artist.name.toUpperCase()}</h2>
                    <TrackDetails connectedTracks={connectedTracks}></TrackDetails>
                </div>
                {relatedArtists
                    ? <> 
                        <h3 className="related-artists--h3" style={{backgroundColor: getBackgroundColor(depth+1)}}>
                                Related Artists to {artist.name} ({relatedArtists.length})
                        </h3>
                        <ul className="related-artists--ul__style" >
                        {relatedArtists.map(artist => (
                            <li key={artist.artist.id}><ArtistSummary artist={artist.artist} connectedTracks={artist.connectedTracks} depth={depth+1}/></li>
                        ))}  
                        </ul>
                    </>
                    : <button className="related_artists--btn" onClick={handleGetRelatedArtists}>
                        Get Related Artists
                    </button>
                } 
            </div>
        </div>
    )
}

export default ArtistSummary;