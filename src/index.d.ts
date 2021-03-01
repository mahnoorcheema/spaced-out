
declare global {

    type ImageDescription = {
        url: string;
        width: number;
        height: number
    }

    type Album = {
        id: string;
        name: string;
        images:ImageDescription[]
    }

    type Track = {
        id: string;
        name: string;
    }

    type ConnectedTrack = {
        track: Track;
        album: Album;
    }

    type Artist = {
        id: string;
        name: string;
        genres: string[]
        images: ImageDescription[]
        followers: any
        connectedTrack: ConnectedTrack[]
    }

}

export {};