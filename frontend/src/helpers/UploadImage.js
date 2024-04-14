const cloudinaryName = import.meta.env.VITE_REACT_APP_CLOUDINARY_NAME;

const UploadImage = async (image) => {
    const url = `https://api.cloudinary.com/v1_1/${cloudinaryName}/image/upload`;

    const formData = new FormData();
    formData.append('file', image);
    formData.append("upload_preset", 'e_commerce_products');

    try {
        const dataResponse = await fetch(url, {
            method: 'post',
            body: formData
        });
        return dataResponse.json();
    } catch (error) {
        // Handle error
        console.error('Error uploading image:', error);
        return null;
    }
};

export default UploadImage;
