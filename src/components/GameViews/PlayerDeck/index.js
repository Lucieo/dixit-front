import React, {useState} from 'react';
import {useQuery} from '@apollo/react-hooks';
import Loading from 'components/Loading';
import {GET_DECK} from 'graphQL/queries';
import Card from './Card';

export default function PlayerDeck({gameId}){
    const [cards, setCards] = useState([])
    const [chosenCard, setChosenCard] = useState()
    const { data, loading, error } = useQuery(
        GET_DECK,
        { variables: {gameId},
            onCompleted({getDeck}){
                console.log("GET DECK ", getDeck)
                setCards(getDeck.cards)
                setChosenCard(getDeck.cards[0].id)
            },
            fetchPolicy:'network-only',
            onError(...error) {
              console.log(error)
            }
        }
    );

    if(loading) return <Loading/>
    console.log(chosenCard)
    return(
        <>
        <h1>Vos cartes</h1>
        <div className='center'>
            <h4>Carte n°{cards.map(card=>card.id).indexOf(chosenCard)+1} selectionnée</h4>
            <div>
                <button className="btn">Valider ma carte</button>
            </div>
        </div>
        <div className="row playerDeck">
        {
            cards.map((card, index)=><Card 
                card={card}
                key={index}
                selected={chosenCard===card.id}
                selectCard={()=>setChosenCard(card.id)}
                />)
        }
        </div>
        </>
    )
}