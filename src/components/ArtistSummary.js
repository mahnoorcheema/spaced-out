import React, { useState } from "react"
import {getRelatedArtists, getFeaturedArtists} from "../helpers/api-helpers"
import {useSeenArtists} from "../contexts/SeenArtistsContext"
import { getSmallestImage } from "../helpers/spotify-helpers";
import TrackDetails from "./TrackDetails";


const getBackgroundColor = (depth) => {
    const hue = 20 * depth
    const saturation = 100
    const lightness = 77
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
 return (
        <div id="tree">
            <div style={{backgroundColor: getBackgroundColor(depth)}}>
                <div className="artist-summary">
                    {smallestImage ? <img className="artist-summary--img__circle" src={smallestImage.url} alt=""/> : <div className="circle"></div>}
                    <div className="artist-summary--details">
                        <p className="artist-summary--title">{artist.name}</p>
                        <TrackDetails connectedTracks={connectedTracks}/>
                    </div>
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