import React from 'react';
import {PlayerCardIcon} from 'components/PlayerIcons'

export default function CardVotes({votes}){
    console.log(votes)
    return(
        <div className="center">
            <p>les votes reçus</p>
            {votes.map((vote, idx)=><PlayerCardIcon key={idx} player={vote} size={"small"}/>)}
        </div>
    )
}