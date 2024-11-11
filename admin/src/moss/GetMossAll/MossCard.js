import React, {useState, useEffect} from "react";
import Card from 'react-bootstrap/Card';
import './GetMossDesing.css';
import './../../desing.scss';

const MossCards = ({selectCard}) => {

    return (
        <div className={"card-main"}>
            <div className={"imgCards"}>
                {selectCard ? (
                    <Card className={"cards"} style={{ width: '23rem' }}>
                        <div className={"img-div-card"}>
                            <Card.Img className={"data-img"} variant="top"  src={`data:image/${selectCard.format};base64,${selectCard.url}`}  />
                        </div>
                        <Card.Body>
                            <Card.Title className={"card-title"}>{selectCard.name}</Card.Title>
                            <Card.Text className={"card-text"}>
                                {selectCard.description}
                            </Card.Text>
                            <Card.Text className={"card-text"}>
                                {selectCard.min_temp}-{selectCard.max_temp}
                            </Card.Text>
                            <button className="btn-card btn-rotation">Detaylar için</button>
                        </Card.Body>
                    </Card>
                ) : (
                    <p>Henüz bir bitki seçilmedi.</p>
                )}
            </div>
        </div>
    );
}
export default MossCards;