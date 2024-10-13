import React, { useState } from "react";
import './mainDesing.css';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";

function MainApp() {
    const [clickedButton, setClickedButton] = useState(null);
    const navigate = useNavigate();

    const handleAddFish = () => {
        setClickedButton('fish');
        navigate('/fish');
    };

    const handleAddFishO = () => {
        setClickedButton('invertebrate');
        navigate('/omurgasiz');
    };

    const handleAddFishB = () => {
        setClickedButton('plant');
        navigate('/moss');
    };

    return (
        <div className="App">
            <div className="app-sub">
                <Button
                    className={`custom-button ${clickedButton === 'fish' ? 'clicked' : ''}`}
                    variant="outline-primary"
                    onClick={handleAddFish}
                >
                    Balık Ekle
                </Button>

                <Button
                    className={`custom-button ${clickedButton === 'invertebrate' ? 'clicked' : ''}`}
                    variant="outline-primary"
                    onClick={handleAddFishO}
                >
                    Omurgasız Canlı Ekle
                </Button>

                <Button
                    className={`custom-button ${clickedButton === 'plant' ? 'clicked' : ''}`}
                    variant="outline-primary"
                    onClick={handleAddFishB}
                >
                    Akvaryum Bitkisi Ekle
                </Button>
            </div>
        </div>
    );
}

export default MainApp;
