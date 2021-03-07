import React, { useState } from "react"
import { getSmallestImage } from "../helpers/spotify-helpers";


const TrackDetails = ({track, onSelectedTrack}) => {
    const smallestAlbumImage = track ? getSmallestImage(track.album.images) : null

    const toggleSongDetils = () => onSelectedTrack(track)

    return (
        <>
            <button className="album-art" onClick={toggleSongDetils}>
                {smallestAlbumImage && <img className="album-art--image" src={smallestAlbumImage.url} alt=""/>}
            </button>
        </>
    )
}

export default TrackDetails;