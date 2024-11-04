import React, {useState, useEffect} from "react";
import "./GetFishDesing.css";
import axios from "axios";
import FishCards from "./GetFishCards";

const GetFishAll = () => {

    const [getFish, setGetFish] = useState([]);
    const [selectFish, SetSelectFish] = useState(null)

    useEffect(() => {
        axios.get('http://localhost:8081/fish/all')
            .then(getAllData => setGetFish(getAllData.data))
            .catch(err => {
                console.log("datalar gelmedi :" + err);
            })
    }, [])


    const dateTimeFormat = (data_time) => {
        const date = new Date(data_time);
        const options = {year: 'numeric', month: '2-digit', day: '2-digit'};
        const formattedDate = date.toLocaleDateString('tr-TR', options);
        const formattedTime = date.toLocaleTimeString('tr-TR', {hour: '2-digit', minute: '2-digit'});
        return {formattedDate, formattedTime};

    }

    const deleteById = (id) => {
        axios.delete(`http://localhost:8081/fish/del/${id}`)
            .then(() => {
                setGetFish(getFish.filter(fish => fish.id !== id))
                alert('Balık başarıyla silindi!');
            })
            .catch(err => console.log("resim silinemedi : " + err));

    }

    const handleFish = (fish) => {
        SetSelectFish(fish);
    }


    return (
        <div className={"table"}>
            <div className={"rotation-table"}>
                <table>
                    <thead>
                    <tr>
                        <th></th>
                        <th>saat</th>
                        <th>Tarih</th>
                        <th>Ad</th>
                        <th>Tür</th>
                    </tr>
                    </thead>
                    <tbody>
                    {getFish.map((item) => {
                        const {formattedDate, formattedTime} = dateTimeFormat(item.time);
                        return (
                            <tr key={item.id}>
                                <td>
                                    <button className={"button-db"} onClick={() => deleteById(item.id)}>sil</button>
                                    <button className={"button-db"} onClick={() => handleFish(item)}>göster</button>
                                </td>
                                <td>{formattedTime}</td>
                                <td>{formattedDate}</td>
                                <td>{item.name}</td>
                                <td>{item.kind}</td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
            <FishCards selectCard={selectFish}/>
        </div>
    );
}

export default GetFishAll;