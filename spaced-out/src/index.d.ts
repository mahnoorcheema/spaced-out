
declare global {

    type ImageDescription = {
        url: string;
        width: number;
        height: number
    }
    type Artist = {
        id: string;
        name: string;
        genres: string[]
        images: ImageDescription[]
    }

}

export {};