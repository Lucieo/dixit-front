import React, {useState} from 'react';
import Loading from 'components/Loading';
import {shuffle} from 'utils';
import ChoiceDeck from './ChoiceDeck';
import ValidatedDeck from './ValidatedDeck';

 
export default function VotePlayerDeck({gameInfo, userId}){
    const pickACardNotMine = ()=>{
        const otherCards = gameInfo.turnDeck.filter(card=>card.owner!==userId).map(el=>el.card)
        return otherCards[Math.floor(Math.random() * otherCards.length)]
    }

    const {players, turnDeck, turnVotes} = gameInfo
    const gameId = gameInfo.id
    const submittedCard = turnVotes.find(el=>el.owner===userId)
    const [cards, setCards] = useState(shuffle(turnDeck.map(el=>el.card)))
    const [chosenCard, setChosenCard] = useState(submittedCard? submittedCard.card : pickACardNotMine())
    const [submitted, setSubmitted] = useState()

    return(
        <>
        <p>VOTE PLAYER DECK</p>
        {
            (submittedCard || submitted)
            ? <ValidatedDeck 
                chosenCard={chosenCard}
                actionType={"voteForCard"}
                />
            : <ChoiceDeck 
                gameId={gameId}
                cards={cards}
                setChosenCard={setChosenCard}
                chosenCard={chosenCard}
                setSubmitted={setSubmitted}
                actionType={"voteForCard"}
                ownCard={turnDeck.find(card=>card.owner===userId).card}
                currentWord={gameInfo.currentWord}
            />
        }
        </>
    )
}