export const base64ToFile = (base64String: string, filename: string): File => {
    // 1. Extract Mime Type and Base64 Data
    const parts = base64String.split(';base64,');
    const mimeType = parts[0].split(':')[1];
    const base64Data = parts[1];

    // 2. Decode Base64 to Binary String
    const binaryString = atob(base64Data);
    const n = binaryString.length;

    // 3. Convert Binary String to Uint8Array
    const uint8Array = new Uint8Array(n);
    for (let i = 0; i < n; i++) {
        uint8Array[i] = binaryString.charCodeAt(i);
    }

    // 4. Create a Blob
    const blob = new Blob([uint8Array], { type: mimeType });

    // 5. Create a File object
    const file = new File([blob], filename, { type: mimeType });

    return file;
}

// Usage example:
/* const base64Image = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==";
const myFile = base64ToFile(base64Image, "myImage.png");
console.log(myFile); */