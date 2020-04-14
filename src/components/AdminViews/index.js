import React from 'react';
import SelectPhase from 'components/AdminViews/SelectPhase'
import VotePhase from 'components/AdminViews/VotePhase'
import InitGame from 'components/AdminViews/InitGame'

export default function AdminViews({gameInfo, gameMode, userId}){
    console.log(gameMode)
    const selectAdminControls=()=>{
        if(gameMode==="init") return <InitGame  gameInfo={gameInfo} userId={userId}/>
        if(gameMode==="select") return <SelectPhase gameInfo={gameInfo}/>
        if(gameMode==="vote") return <VotePhase gameInfo={gameInfo}/>
    }
    return(
        <div>
            {selectAdminControls()}
        </div>
    )
}