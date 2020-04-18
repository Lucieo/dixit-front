import React from 'react';
import Card from 'components/Card'
import {LAUNCH_GAME_STEP} from 'graphQL/mutations';
import {useMutation} from '@apollo/react-hooks';


export default function SelectPhase({cards, currentWord, players, userId, gameId}){
    const [launchVote]=useMutation(LAUNCH_GAME_STEP, {
        variables:{
            gameId,
            step: "launchVote",
            turnMaster: userId
        }
    })
    return(
        <div className="center">
            <p>LE MOT QUE VOUS AVEZ CHOISI</p>
            <h5> {currentWord}</h5>
            {
                cards.length===players.length && 
                <div>
                    <p>Tout le monde a choisi sa carte!</p>
                    <button className="btn" onClick={()=>launchVote()}>PASSER AU VOTE</button>
                </div>
            }
            <div className="row">
                {
                    cards.map((card, idx)=>
                        <Card
                            key={idx}
                            card={card.card}
                            owner={players.find(el=>el.id===card.owner)}
                            isOwnCard={card.owner===userId}
                        />
                    )
                }
            </div>
        </div>
    )
}