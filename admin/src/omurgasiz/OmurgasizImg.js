import React, {useState} from "react";

const GetImg = ({onImageUpload}) =>{
    const [image, setImage] = useState(null);
    const [imageFile, setImageFile] = useState(null);

    const imageupload = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImage(URL.createObjectURL(file));
            setImageFile(file);
            onImageUpload(file);
        }
    };

    return (
        <div>
            <input type="file" accept="image/*" onChange={imageupload} />
            {image && (
                <div>
                    <h2>Yüklenen Resim:</h2>
                    <img src={image} alt="Selected" style={{ width: '300px', height: 'auto', margin: '10px' }} />
                </div>
            )}
        </div>
    );
}

export default GetImg;