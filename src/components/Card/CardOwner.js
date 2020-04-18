import React from 'react';
import {PlayerCardIcon} from 'components/PlayerIcons';


export default function CardOwner({owner, isOwnCard}){
    return(
        <div className="center">
            {
                isOwnCard 
                ?<p>Votre carte</p>
                :<p>la carte de {owner.name}</p>
            }
            <PlayerCardIcon player={owner}/>
        </div>
    )
}