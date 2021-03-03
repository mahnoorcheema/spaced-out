export const getSmallestImage = images => {
    let smallestSoFar = images[0];
    images.forEach(image => {
        if (image.width < smallestSoFar.width)
            smallestSoFar = image
    });
    return smallestSoFar;
}
