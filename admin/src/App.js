import React from "react";
import './App.css';
import MainPage from './main/mainPage';
import FishAddPage from './balik/fishAdd'; // Doğru bileşeni içe aktar
import {BrowserRouter as Router, Route, Routes, Link} from "react-router-dom";
import MossPage from './moss/mossPage';
import Omurgasiz from './omurgasiz/omurgasizPage';

function App() {
    return (

        <div>
            <MainPage/>

            <Routes>
                <Route path="/fish" element={<FishAddPage/>}/>
                <Route path="/omurgasiz" element={<Omurgasiz/>}/>
                <Route path="/moss" element={<MossPage/>}/>
            </Routes>
        </div>

    );
}

export default App;
