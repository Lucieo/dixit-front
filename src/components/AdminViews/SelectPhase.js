import React from 'react';


export default function SelectPhase({gameInfo}){
    return(
        <div className="center container">
            <p>LE MOT QUE VOUS AVEZ CHOISI</p>
            <h5> {gameInfo.currentWord}</h5>
            <p>VIEWING SELECTION</p>
        </div>
    )
}