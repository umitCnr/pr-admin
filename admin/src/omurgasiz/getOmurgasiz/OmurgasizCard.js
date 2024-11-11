import React, {useState, useEffect} from "react";
import Card from 'react-bootstrap/Card';
import './GetOmurgasizDesing.css';
import './../../desing.scss';

const FishCards = ({selectCard}) => {

    return (
        <div className={"card-main"}>
            <div className={"imgCards"}>
                {selectCard ? (
                    <Card className={"cards"} style={{ width: '23rem' }}>
                        <div className={"img-div-card"}>
                            <Card.Img className={"data-img"} variant="top"  src={`data:image/${selectCard.format};base64,${selectCard.imgUrl}`}  />
                        </div>
                        <Card.Body>
                            <Card.Title className={"card-title"}>{selectCard.name}</Card.Title>
                            <Card.Text className={"card-text"}>
                                {selectCard.description}
                            </Card.Text>
                            <button className="btn-card btn-rotation">Detaylar için</button>
                        </Card.Body>
                    </Card>
                ) : (
                    <p>Henüz bir Omurgasız Canlı seçilmedi.</p>
                )}
            </div>
        </div>
    );
}
export default FishCards;