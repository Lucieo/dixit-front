import React, { useState } from 'react';
import requireAuth from 'components/requireAuth';
import AdminViews from 'components/AdminViews';
import PlayerViews from 'components/PlayerViews';




const ActiveGame = ({gameInfo, userId})=>{
    const {players, turnDeck, turnPoints, turn, currentWord} = gameInfo
    const playerPosition = players.map(player=>player.id).indexOf(userId)
    const isTurnAdmin = (playerPosition === turn)

    const getGameMode=()=>{
        if(!currentWord) return 'init'
        if(turnDeck.length!==players.length) return "select"
        if((turnDeck.length===players.length) && !turnPoints) return "vote"
        if(turnDeck && turnPoints) return "showPoints"
    }
    const gameMode = getGameMode()

    return(
        <div className="active-game">
            <h1>ACTIVE GAME</h1>
            {isTurnAdmin 
            ? <AdminViews gameInfo={gameInfo} gameMode={gameMode} userId={userId}/>
            : <PlayerViews gameMode={gameMode} gameInfo={gameInfo} userId={userId}/>
            }
        </div>
    )
}

export default requireAuth(ActiveGame);