import sharp from 'sharp';

async function getImageSize() {
    try {
        const metadata = await sharp('public/sneaker-template.png').metadata();
        console.log(`Width: ${metadata.width}, Height: ${metadata.height}`);
    } catch (error) {
        console.error('Error:', error);
    }
}

getImageSize();
