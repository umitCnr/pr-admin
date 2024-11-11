import React, { useState } from "react";
import axios from "axios";
import ImageMoss from "./MossImg";
import GetMossAll from "./GetMossAll/GetMoss";

const MossAddPage = () => {
    const [showAdd, setShowAdd] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [radio, setRadio] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [max, setMax] = useState("");
    const [min, setMin] = useState("");

    const showDialog = () => {
        setShowAdd(true);
    }

    const closeDialog = () => {
        setShowAdd(false);
        setName("");
        setDescription("");
        setRadio("");
        setImageFile(null);
        setMin("");
        setMax("")
    };

    const fish = (e) => {
        setName(e.target.value);
    }

    const maxtemp = (e) => {
        setMax(e.target.value);
    }

    const mintemp = (e) => {
        setMin(e.target.value);
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
        data.append("min", min);
        data.append("max", max);

        try {
            const response = await axios.post('http://localhost:8081/bitki/save', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log("Başarıyla yüklendi: ", response.data);
            alert("Eklendi!");
            setShowAdd(false);
        } catch (e) {
            console.error("Data gönderilmedi: ", e.response ? e.response.data : e.message);
            alert("Hata");
        }
    };

    const handleImageUpload = (file) => {
        setImageFile(file);
    };

    return (
        <div className={"main-flex"}>
            <div className={"b-d"}>
                <button className={"add-button balik-add"} onClick={showDialog}>Bitki yükle</button>

                {showAdd && (
                    <>
                        <div className={"dialog-open"} />
                        <div className={"dialog"}>
                            <div className={"fish-name"}>
                                <label htmlFor="fishName">İsim</label>
                                <input type={'text'} value={name} onChange={fish} id="fishName" />
                            </div>
                            <div>
                                <ImageMoss onImageUpload={handleImageUpload} />
                            </div>
                            <div>
                                <label htmlFor="fishDescription">Açıklama</label>
                                <input type={'text'} value={description} onChange={fishDescription} id="fishDescription" />
                            </div>
                            <div>
                                <label htmlFor="maxTemperature">MAX-sıcaklık</label>
                                <input type={'text'} value={max} onChange={maxtemp} id="maxTemperature" />
                            </div>
                            <div>
                                <label htmlFor="minTemperature">MİN-sıcaklık</label>
                                <input type={'number'} value={min} onChange={mintemp} id="minTemperature" />
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
                                    <label htmlFor="TATLI">Tatlı Su Bitkisi</label>
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
                                    <label htmlFor="TUZLU">Tuzlu Su Bitkisi</label>
                                </div>
                            </div>
                            <button className={"add-button d-b"} onClick={addFishDB}>Kaydet</button>
                            <button className={"add-button d-b"} onClick={closeDialog}>Kapat</button>
                        </div>
                    </>
                )}
            </div>

            <div>
                <GetMossAll />
            </div>
        </div>
    );
};

export default MossAddPage;
