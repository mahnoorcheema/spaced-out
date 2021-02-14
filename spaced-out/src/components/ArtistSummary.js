import React, { useState } from "react"
import {getRelatedArtists} from "../helpers/api-helpers"

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
    
    const handleGetRelatedArtists = async () =>
        setRelatedArtists(await getRelatedArtists(artist.id));
        
    const smallestImage = getSmallestImage(artist.images);
    
    return (
        <div style={{backgroundColor: `rgba(64,98,128, .2)`}}>
            <p>{artist.name}</p>
            {smallestImage && <img style={{maxWidth: "1rem", height: "auto"}} src={smallestImage.url} alt=""/>}
            
            
            {relatedArtists
                ? <> 
                    <h3>Related Artists</h3>
                    <ul>
                      {relatedArtists.map(artist => (
                          <li key={artist.id}><ArtistSummary artist={artist}/></li>
                      ))}  
                    </ul>
                </>
                : <button onClick={handleGetRelatedArtists}>
                    Get Related Artists
                </button>
            }
        </div>
    )
}

export default ArtistSummary;