export const blobToString = async (blob: Blob) => {
    const reader = new FileReader();

    // This fires after the blob has been read/loaded.
    reader.readAsDataURL(blob);
    reader.onloadend = async function () {
        var base64String = reader.result as string;
        window.localStorage.setItem("fc", base64String);
        console.log(base64String);

    }
}

export const b64toBlob = (b64Data: string, contentType = '', sliceSize = 512) => {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);

        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
}