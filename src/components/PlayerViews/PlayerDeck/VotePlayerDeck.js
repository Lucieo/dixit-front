import React, {useState} from 'react';
import Loading from 'components/Loading';
import ChoiceDeck from './ChoiceDeck';
import ValidatedDeck from './ValidatedDeck';

 
export default function VotePlayerDeck({gameInfo, userId}){
    const {players, turnDeck, turnVotes} = gameInfo
    const gameId = gameInfo.id
    const submittedCard = turnVotes.find(el=>el.owner===userId)
    const [cards, setCards] = useState(turnDeck.map(el=>el.card))
    const [chosenCard, setChosenCard] = useState(submittedCard? submittedCard.card : cards[0])
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
                ownCard={submittedCard}
            />
        }
        </>
    )
}