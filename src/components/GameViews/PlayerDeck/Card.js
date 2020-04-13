import React from 'react';
import './PlayerDeck.css';
import {Link} from 'react-router-dom';

export default function Card({card, selected, selectCard}){
    return(
        <div className="col s4 playerCard__wrapper">
            <div 
            className={`playerCard ${selected && 'selected'}`}
            style={{background: `url(http://localhost:4000/images/${card.fileName})`}}
            onClick={()=>selectCard()}
            >
                {selected && <i className="material-icons medium yellow-text text-darken-2">star</i>}
            </div>
        </div>
    )
}
