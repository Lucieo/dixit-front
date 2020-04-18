import React from 'react';
import Card from 'components/Card';
import {SELECT_CARD} from 'graphQL/mutations';
import {useMutation} from '@apollo/react-hooks';
import { act } from '@testing-library/react';

export default function ChoiceDeck({gameId, cards, chosenCard, setChosenCard, setSubmitted, actionType, ownCard, currentWord, admin=false}){
    const [submitCard]=useMutation(SELECT_CARD, {
        variables:{
            gameId,
            cardId: chosenCard && chosenCard.id,
            actionType
        },
        onCompleted(){
            setSubmitted(true)
        }
    })

    console.log("PLAYER VOTE ownCard", ownCard)
    console.log("PLAYER VOTE cards", cards)

    return(
        <div>
            {
                !admin && 
                <div className='center'>
                    <div className="row">
                    <div className="col s6">
                        <h5>Carte choisie</h5>
                        {chosenCard && <Card card={chosenCard} fullSize={true}/>}
                    </div>
                    <div className="col s6">
                        <h5>Le mot est</h5>
                        <h4>{currentWord}</h4>
                        <div>
                        <button className="btn" onClick={()=>submitCard()}>
                            {
                                actionType=="submitCard"
                                ? "Valider ma carte"
                                : "Voter pour cette carte"
                            }
                        </button>
                    </div>
                    </div>
                    </div>
                </div>
            }

           
            {
                actionType==="submitCard"
                ? <h4>Vos Cartes</h4>
                : <h4>Les cartes du jeu</h4>
            }
            <hr/>
            <div className="row playerDeck">
                {
                    cards && cards.map((card, index)=><Card 
                        card={card}
                        key={index}
                        selected={chosenCard.id===card.id}
                        clickAction={()=>setChosenCard(card)}
                        actionType={actionType}
                        isOwnCard={(ownCard && card===ownCard)}
                        />)
                }
            </div> 
        </div>
    )
}