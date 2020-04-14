import React from 'react';
import Card from 'components/Card';
import {SELECT_CARD} from 'graphQL/mutations';
import {useMutation} from '@apollo/react-hooks';

export default function ChoiceDeck({gameId, cards, chosenCard, setChosenCard, setSubmitted, actionType, ownCard, admin=false}){
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

    return(
        <div>
            {
                !admin && 
                <div className='center'>
                    <h4>carte n°{(cards && chosenCard) && cards.map(card=>card.id).indexOf(chosenCard.id)+1} selectionnée</h4>
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
            }

           

            <div className="row playerDeck">
                {
                    cards && cards.map((card, index)=><Card 
                        card={card}
                        key={index}
                        selected={chosenCard.id===card.id}
                        clickAction={()=>setChosenCard(card)}
                        actionType={actionType}
                        isOwnCard={card===ownCard}
                        />)
                }
            </div> 
        </div>
    )
}