import React from 'react';

export default function PlayerListIcon({player, admin}){
    return(
        <>
            <li className="collection-item"
                style={{display:"flex", alignItems:"center"}}
            >
                <span>
                    <img 
                    style={{width:30, marginRight:10}}
                    src={`../images/players/${player.icon}.png`}/>
                </span>
                <span>{player.name}</span>  {admin && <span> - GAME MASTER</span>}
            </li>
        </>
    )
}