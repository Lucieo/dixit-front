import React from 'react';
import './Card.css';

export default function Card({card, selected=false, clickAction=null, isOwnCard=false, actionType}){
    return(
        <div className="col m4 s12 playerCard__wrapper">
            <div 
            className={`playerCard ${(actionType==="submitCard" && selected) && 'selected'} ${(actionType==="voteForCard" && selected) && 'voted'} ${isOwnCard && 'ownCard'} ${!isOwnCard && 'canHover'}`}
            style={{background: `url(http://localhost:4000/images/${card.fileName})`}}
            onClick={()=>clickAction && clickAction()}
            >
                {(actionType==="submitCard" && selected) && <i className="material-icons medium yellow-text text-darken-2">star</i>}
                {(actionType==="voteForCard" && selected) && <i className="material-icons medium green-text text-darken-2">thumb_up</i>}
            </div>
        </div>
    )
}
