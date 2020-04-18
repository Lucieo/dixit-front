import React, {useState} from 'react';
import Loading from 'components/Loading';
import ChoiceDeck from './ChoiceDeck';
import ValidatedDeck from './ValidatedDeck';
import {GET_DECK} from 'graphQL/queries';
import {useQuery} from '@apollo/react-hooks';

 
export default function SelectPlayerDeck({gameInfo, userId}){
    const {players, turnDeck, currentWord} = gameInfo
    const gameId = gameInfo.id
    const submittedCard = turnDeck.find(el=>el.owner===userId)
    const [chosenCard, setChosenCard] = useState()
    const [submitted, setSubmitted] = useState()
    const [cards, setCards] = useState([])

    const { data, loading, error } = useQuery(
        GET_DECK,
        { variables: {gameId},
            onCompleted({getDeck}){
                setCards(getDeck.cards)
                console.log("getDeck.cards", getDeck.cards)
                submittedCard
                ? setChosenCard(getDeck.cards.find(card=>submittedCard.card.id === card.id))
                : setChosenCard(getDeck.cards[0])
            },
            fetchPolicy:'network-only',
            onError(...error) {
              console.log(error)
            }
        }
    );

    if(loading) return <Loading/>

    return(
        <div className="center container">
        {
            (submittedCard || submitted)
            ? <ValidatedDeck 
            chosenCard={chosenCard}
            actionType={"submitCard"}/>
            : <ChoiceDeck 
                gameId={gameId}
                cards={cards}
                setChosenCard={setChosenCard}
                chosenCard={chosenCard}
                setSubmitted={setSubmitted}
                actionType={"submitCard"}
                currentWord={currentWord}
                userId={userId}
            />
        }
        </div>
    )
}