import React, {useState, useEffect} from "react";
import './GetMossDesing.css';
import axios from "axios";
import MossCards from "./MossCard";

const GetMossAll = () => {

    const [getFish, setGetFish] = useState([]);
    const [selectFish, SetSelectFish] = useState(null)
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        axios.get('http://localhost:8081/bitki/getAll')
            .then(getAllData => setGetFish(getAllData.data))
            .catch(err => {
                console.log("datalar gelmedi :" + err);
            })
    }, [])

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = getFish.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);


    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(getFish.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }


    const dateTimeFormat = (data_time) => {
        const date = new Date(data_time);
        const options = {year: 'numeric', month: '2-digit', day: '2-digit'};
        const formattedDate = date.toLocaleDateString('tr-TR', options);
        const formattedTime = date.toLocaleTimeString('tr-TR', {hour: '2-digit', minute: '2-digit'});
        return {formattedDate, formattedTime};

    }

    const deleteById = (id) => {
        axios.delete(`http://localhost:8081/bitki/delete/${id}`)
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
                    {currentItems.map((item) => {
                        const { formattedDate, formattedTime } = dateTimeFormat(item.time);
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
                </table>
                <div className="pagination">
                    {pageNumbers.map((number) => (
                        <button key={number} onClick={() => paginate(number)} className={number === currentPage ? "active" : ""}>
                            {number}
                        </button>
                    ))}
                </div>
            </div>
            <MossCards selectCard={selectFish}/>
        </div>
    );
}

export default GetMossAll;