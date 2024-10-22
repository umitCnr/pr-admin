import React, {useState} from "react";
import './../desing.scss';
import './fishDesing.css';
import axios from "axios";
import ImageFish from "./fishImage";

const FishAddPage = () => {

    const [showAdd, setShowAdd] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [radio, setRadio] = useState('');


    const showDialog = () => {
        setShowAdd(true);
    }

    const closeDialog = () => {
        setShowAdd(false);
        setName("");
        setDescription("");
        setRadio("");
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

    const addFishDB = async (e) => {

        const data = {
            name: name,
            description: description,
            kind: radio
        };

        try {

            const response = await axios.post('http://localhost:8081/omurgasiz/save', data);
            console.log("başarıyle yüklendi" + response)

        } catch (e) {
            console.log("data gönderilmedi :" + e)
        }
    }


    return (
        <div className={"main-flex"}>
            <div className={"b-d"}>
                <button className={"add-button balik-add"} onClick={showDialog}>Balık yükle</button>

                {showAdd && (
                    <>
                        <div className={"dialog-open"}/>
                        <div className={"dialog"}>
                            <div className={"fish-name"}>
                                <label>isim</label>
                                <input type={'text'} value={name} onChange={fish}/>
                            </div>
                            <div>
                               <ImageFish/>
                            </div>
                            <div>
                                <label>açıklama</label>
                                <input type={'text'} value={description} onChange={fishDescription}/>
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
                            <button className={"add-button d-b"} onClick={addFishDB}>kaydet</button>
                            <button className={"add-button d-b"} onClick={closeDialog}>Kapat</button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
export default FishAddPage;