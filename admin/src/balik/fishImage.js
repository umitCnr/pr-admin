import React, {useState} from "react";

const ImageFish = () =>{

    const [image,SetImage] = useState(null);

    const imageupload = (e) =>{
        if (e.target.files && e.target.files[0]){
            const imageFile = e.target.files[0];
            SetImage(URL.createObjectURL(imageFile));
        }
    };

    return(
      <div>
          <input type="file" accept="image/*" onChange={imageupload} />
          {SetImage && (
              <div>
                  <h2>Yüklenen Resim:</h2>
                  <img src={image} alt="Selected" style={{ width: '300px', height: 'auto' }} />
              </div>
          )}
      </div>
    );

}
export default ImageFish;