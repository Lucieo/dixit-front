import React, {useState} from 'react';
import {INIT_GAME} from 'graphQL/mutations';
import ChoiceDeck from 'components/PlayerViews/PlayerDeck/ChoiceDeck';
import {GET_DECK} from 'graphQL/queries';
import {useQuery, useMutation} from '@apollo/react-hooks';
import Loading from 'components/Loading';
import Card from 'components/Card';


export default function InitGame({gameInfo, userId}){
    const {turnDeck}= gameInfo
    const gameId = gameInfo.id
    const submittedCard = turnDeck.find(el=>el.owner===userId)
    const [currentWord, setCurrentWord] = useState('')
    const [chosenCard, setChosenCard] = useState()
    const [submitted, setSubmitted] = useState()
    const [cards, setCards] = useState([])

    const { data, loading, error } = useQuery(
        GET_DECK,
        { variables: {gameId},
            onCompleted({getDeck}){
                setCards(getDeck.cards)
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

    const [initGame]=useMutation(INIT_GAME, {
        variables:{
            gameId,
            cardId: chosenCard && chosenCard.id,
            currentWord
        }
    })

    if(loading) return <Loading/>

    return(
        <>
        <div className="row">
            <div className="col s6">
                <h5>Ma carte</h5>
                {chosenCard && <Card card={chosenCard} fullSize={true}/>}
            </div>
            <div className="col s6">
                <h5>Mon mot</h5>
                <input placeholder="le mot illustrant votre carte" value={currentWord} onChange={e=>setCurrentWord(e.target.value)}/>
            </div>
            <div className="col s12 center">
                <button className={`btn ${!currentWord && "disabled"}`} onClick={()=>initGame()}>VALIDER MON CHOIX</button>
            </div>
        </div>
        <hr/>
        <h5 className="center">Vos cartes</h5>
        <ChoiceDeck 
                gameId={gameId}
                cards={cards}
                setChosenCard={setChosenCard}
                chosenCard={chosenCard}
                setSubmitted={setSubmitted}
                actionType={"submitCard"}
                admin={true}
            />
        </>
    )
}