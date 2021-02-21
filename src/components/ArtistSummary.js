import React, { useState } from "react"
import {getRelatedArtists} from "../helpers/api-helpers"
import {useSeenArtists} from "../contexts/SeenArtistsContext"

const getSmallestImage = images => {
    let smallestSoFar = images[0];
    images.forEach(image => {
        if (image.width < smallestSoFar.width)
            smallestSoFar = image
    });
    return smallestSoFar;
}

/**
 * @param {Object} props
 * @param {Artist} props.artist
 */
const ArtistSummary = ({ artist }) => {
    /** @type{[(Artist[] | null), Function]} */
    const [relatedArtists, setRelatedArtists] = useState(null)
    const {isArtistsUnique, addToSeenArtists} = useSeenArtists()
    
    const handleGetRelatedArtists = async () => {
        const allRelatedArtists = await getRelatedArtists(artist.id)
        const uniqueRelatedArtists = allRelatedArtists.filter(isArtistsUnique)
        uniqueRelatedArtists.forEach(addToSeenArtists)
        setRelatedArtists(uniqueRelatedArtists)
    }

    const smallestImage = getSmallestImage(artist.images);
    
    return (
        <div id="tree" className="div--color">
            <div className="div--display__flex">
                {smallestImage && <img className="img--style__circle" src={smallestImage.url} alt=""/>}
                <p className="p--margin">{artist.name}</p>
            </div>
            
            {relatedArtists
                ? <> 
                    <ul className="ul--liststyle">
                        <h3 className="h3--related_artists">
                            Related Artists to {artist.name} ({relatedArtists.length})
                        </h3>
                      {relatedArtists.map(artist => (
                          <li key={artist.id}><ArtistSummary artist={artist}/></li>
                      ))}  
                    </ul>
                </>
                : <button className="btn--related_artists" onClick={handleGetRelatedArtists}>
                    Get Related Artists
                </button>
            }
        </div>
    )
}

export default ArtistSummary;