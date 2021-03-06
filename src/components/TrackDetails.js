import React from "react"
import { getSmallestImage } from "../helpers/spotify-helpers";


const TrackDetails = ({connectedTracks}) => {
    const smallestAlbumImage = connectedTracks ? getSmallestImage(connectedTracks[0].album.images) : null
    return (
        <>
         <div className="album-art">
            {smallestAlbumImage && <img className="album-art--image" src={smallestAlbumImage.url} alt=""/>}
        </div>
        <div className="song-details">
            {console.log(connectedTracks)}
            <h3 className="song-name">{connectedTracks ? `"${connectedTracks[0].track.name}"` : ""}</h3>
            <p className="album-name">{connectedTracks ? `-${connectedTracks[0].album.name}` : ""}</p>
        </div>
        </>
    )
}

export default TrackDetails;