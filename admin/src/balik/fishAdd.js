import React, { useState } from "react";
import './../desing.scss';
import './fishDesing.css';
import axios from "axios";
import ImageFish from "./fishImage";
import GetFishAll from "./getFish/GetFishPage";

const FishAddPage = () => {
    const [showAdd, setShowAdd] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [radio, setRadio] = useState('');
    const [imageFile, setImageFile] = useState(null);

    const showDialog = () => {
        setShowAdd(true);
    }

    const closeDialog = () => {
        setShowAdd(false);
        setName("");
        setDescription("");
        setRadio("");
        setImageFile(null);
    };

    const fish = (e) => {
        setName(e.target.value);
    }
    const fishDescription = (e) => {
        setDescription(e.target.value);
    }

    const handleRadio = (e) => {
        setRadio(e.target.value);
    }

    const addFishDB = async () => {
        const data = new FormData();
        data.append("file", imageFile);
        data.append("name", name);
        data.append("description", description);
        data.append("kind", radio);

        try {
            const response = await axios.post('http://localhost:8081/fish/save', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log("Başarıyla yüklendi: ", response.data);
            alert("eklendi!")
            setShowAdd(false);
        } catch (e) {
            console.log("Data gönderilmedi: ", e);
            alert("hata")
        }
    };

    const handleImageUpload = (file) => {
        setImageFile(file);
    };

    return (
        <div className={"main-flex"}>
            <div className={"b-d"}>
                <button className={"add-button balik-add"} onClick={showDialog}>Balık yükle</button>

                {showAdd && (
                    <>
                        <div className={"dialog-open"} />
                        <div className={"dialog"}>
                            <div className={"fish-name"}>
                                <label>isim</label>
                                <input type={'text'} value={name} onChange={fish} />
                            </div>
                            <div>
                                <ImageFish onImageUpload={handleImageUpload} />
                            </div>
                            <div>
                                <label>açıklama</label>
                                <input type={'text'} value={description} onChange={fishDescription} />
                            </div>
                            <div>
                                <div>
                                    <input
                                        type={"radio"}
                                        name="selection"
                                        id={"TATLI"}
                                        value={"TATLI"}
                                        checked={radio === "TATLI"}
                                        onChange={handleRadio}
                                    />
                                    <label htmlFor="TATLI">Tatlı Su Balığı</label>
                                </div>
                                <div>
                                    <input
                                        type={"radio"}
                                        name="selection"
                                        id={"TUZLU"}
                                        value={"TUZLU"}
                                        checked={radio === "TUZLU"}
                                        onChange={handleRadio}
                                    />
                                    <label htmlFor="TUZLU">Tuzlu Su Balığı</label>
                                </div>
                            </div>
                            <button className={"add-button d-b"} onClick={addFishDB}>Kaydet</button>
                            <button className={"add-button d-b"} onClick={closeDialog}>Kapat</button>
                        </div>
                    </>
                )}
            </div>

            <div>
                <GetFishAll/>
            </div>
        </div>
    );
}
export default FishAddPage;
