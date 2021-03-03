import React from "react"
import { getSmallestImage } from "../helpers/spotify-helpers";


const TrackDetails = ({connectedTracks}) => {
    const smallestAlbumImage = connectedTracks ? getSmallestImage(connectedTracks[0].album.images) : null
    return (
    <div className="album">
        {smallestAlbumImage && <img className="album--image" src={smallestAlbumImage.url} alt=""/>}
        <div>
            <p className="album--p album--p__song-name"> {connectedTracks ? connectedTracks[0].track.name : ""}</p>
            <p className="album--p album--p__album-name">{connectedTracks ? connectedTracks[0].album.name : ""}</p>
        </div>
    </div>
    )
}

export default TrackDetails;