import React, { useState } from "react"
import {getRelatedArtists, getFeaturedArtists} from "../helpers/api-helpers"
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
 * @param {ConnectedTrack} props.connectedTracks
 */
const ArtistSummary = ({ artist, connectedTracks }) => {
    /** @type{[(Artist[] | null), Function]} */
    const [relatedArtists, setRelatedArtists] = useState(null)
    const {isArtistsUnique, addToSeenArtists} = useSeenArtists()
    const handleGetRelatedArtists = async () => {
        // const allRelatedArtists = await getFeaturedArtists(artist.id)
        // const uniqueRelatedArtists = allRelatedArtists.filter(isArtistsUnique)
        // uniqueRelatedArtists.forEach(addToSeenArtists)
        // setRelatedArtists(uniqueRelatedArtists)
        
        setRelatedArtists( await getFeaturedArtists(artist.id))
        // console.log(relatedArtists)
    }

    const smallestImage = getSmallestImage(artist.images);
    const smallestAlbumImage = connectedTracks ? getSmallestImage(connectedTracks[0].album.images) : null
    console.log(smallestAlbumImage)
    return (
        <div id="tree" className="background-color">
            <div className="artist-summary">
                {smallestImage && <img className="artist-summary--img__circle" src={smallestImage.url} alt=""/>}
                <div className="artist-summary--details">
                    <p className="artist-summary--title">{artist.name}</p>
                    <div className="album">
                        {smallestAlbumImage && <img className="album--image" src={smallestAlbumImage.url} alt=""/>}
                        <div>
                            <p className="album--p album--p__song-name"> {connectedTracks ? connectedTracks[0].track.name : ""}</p>
                            <p className="album--p album--p__album-name">{connectedTracks ? connectedTracks[0].album.name : ""}</p>
                        </div>
                    </div>
                </div>
            </div>
            
            {relatedArtists
                ? <> 
                    <ul className="related-artists--ul__style">
                        <h3 className="related-artists--h3">
                            Related Artists to {artist.name} ({relatedArtists.length})
                        </h3>
                      {relatedArtists.map(artist => (
                          <li key={artist.id}><ArtistSummary artist={artist.artist} connectedTracks={artist.connectedTracks}/></li>
                      ))}  
                    </ul>
                </>
                : <button className="related_artists--btn" onClick={handleGetRelatedArtists}>
                    Get Related Artists
                </button>
            }
        </div>
    )
}

export default ArtistSummary;