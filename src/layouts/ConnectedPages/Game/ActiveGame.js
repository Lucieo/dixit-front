import React, { useState } from 'react';
import requireAuth from 'components/requireAuth';
import PlayerDeck from 'components/GameViews/PlayerDeck';
import Table from 'components/GameViews/Table';
import PointsDisplay from 'components/GameViews/PointsDisplay';
import AdminControls from 'components/GameViews/AdminControls'




const ActiveGame = ({gameInfo, userId})=>{
    const turn = gameInfo.turn
    const playerPosition = gameInfo.players.map(player=>player.id).indexOf(userId)
    const isTurnAdmin = (playerPosition === gameInfo.turn)

    const selectGameView = ()=>{
        if(!gameInfo.turnDeck) return <PlayerDeck gameId={gameInfo.id}/>
        if(gameInfo.turnDeck && !gameInfo.turnPoints) return <Table gameInfo={gameInfo}/>
        if(gameInfo.turnDeck && gameInfo.turnPoints) return <PointsDisplay gameInfo={gameInfo}/>
    }

    return(
        <div className="active-game">
            <h1>ACTIVE GAME</h1>
            {isTurnAdmin && <AdminControls gameInfo={gameInfo}/>}
            {selectGameView()}
        </div>
    )
}

export default requireAuth(ActiveGame);