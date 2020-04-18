import React from 'react';
import Card from 'components/Card'
import {LAUNCH_GAME_STEP} from 'graphQL/mutations';
import {useMutation} from '@apollo/react-hooks';

export default function VotePhase({cards, players, votes, userId, gameId}){
    const getPlayersWhoVoted=(cardId)=>{
        const votersIds = votes.filter(vote=>vote.card.id===cardId).map(el=>el.owner)
        const playersProfiles = players.filter(player=>votersIds.indexOf(player.id)>-1)
        return playersProfiles
    }

    const [launchEvaluation]=useMutation(LAUNCH_GAME_STEP, {
        variables:{
            gameId,
            step: "launchEvaluation",
            turnMaster: userId
        }
    })

    return(
        <div>
            SEEING PLAYERS VOTES
            {
                votes.length+1===players.length && 
                <div>
                    <p>Tout le monde a bien voté!</p>
                    <button className="btn" onClick={()=>launchEvaluation()}>DISTRIBUER LES POINTS</button>
                </div>
            }
            <div className="row">
                {
                    cards.map((card, idx)=>
                        <Card
                            key={idx}
                            card={card.card}
                            owner={players.find(el=>el.id===card.owner)}
                            votes={getPlayersWhoVoted(card.card.id)}
                            isOwnCard={card.owner===userId}
                        />
                    )
                }
            </div>
        </div>
    )
}