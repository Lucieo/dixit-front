import React from 'react';

export default function WaitForInit({gameInfo}){
    const {players, turn} = gameInfo
    const turnAdmin = players[turn]
    return(
        <div className="center container">
            <img src={`../images/players/${turnAdmin.icon}.png`}/>
            <p>Un peu de patience {turnAdmin.name} est entrain de sélectionner une carte et un mot pour commencer un nouveau tour...</p>
        </div>
    )
}