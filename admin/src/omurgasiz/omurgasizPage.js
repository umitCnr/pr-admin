import React, { useState } from "react";
import './OmurgasizDesing.css';
import GetImg from "./OmurgasizImg";
import axios from "axios";
import GetOmurgasizAll from "./getOmurgasiz/GetOmurgasizPage";

const OmurgasizAddPage = () => {
    const [showAdd, setShowAdd] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        kind: "",
        imageFile: null,
    });

    const showDialog = () => {
        setShowAdd(true);
    };

    const closeDialog = () => {
        setShowAdd(false);
        setFormData({ name: "", description: "", kind: "", imageFile: null });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleRadioChange = (e) => {
        const { value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            kind: value,
        }));
    };

    const handleImageUpload = (file) => {
        setFormData((prevState) => ({
            ...prevState,
            imageFile: file,
        }));
    };

    const addFishDB = async () => {
        const data = new FormData();
        data.append("file", formData.imageFile);
        data.append("name", formData.name);
        data.append("description", formData.description);
        data.append("kind", formData.kind);

        try {
            const response = await axios.post('http://localhost:8081/omurgasiz/save', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log("Başarıyla yüklendi: ", response.data);
            alert("Balık eklendi!");
            setShowAdd(false);
        } catch (e) {
            console.log("Data gönderilmedi: ", e);
            alert("Bir hata oluştu. Lütfen tekrar deneyin.");
        }
    };

    return (
        <div className={"main-flex"}>
            <div className={"b-d"}>
                <button className={"add-button balik-add"} onClick={showDialog}>Omurgasız Canlı yükle</button>

                {showAdd && (
                    <>
                        <div className={"dialog-open"} />
                        <div className={"dialog"}>
                            <div className={"fish-name"}>
                                <label>İsim</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <GetImg onImageUpload={handleImageUpload} />
                            </div>
                            <div>
                                <label>Açıklama</label>
                                <input
                                    type="text"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <div>
                                    <input
                                        type="radio"
                                        name="kind"
                                        id="TATLI"
                                        value="TATLI"
                                        checked={formData.kind === "TATLI"}
                                        onChange={handleRadioChange}
                                    />
                                    <label htmlFor="TATLI">Tatlı Su Balığı</label>
                                </div>
                                <div>
                                    <input
                                        type="radio"
                                        name="kind"
                                        id="TUZLU"
                                        value="TUZLU"
                                        checked={formData.kind === "TUZLU"}
                                        onChange={handleRadioChange}
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
                <GetOmurgasizAll />
            </div>
        </div>
    );
};

export default OmurgasizAddPage;
