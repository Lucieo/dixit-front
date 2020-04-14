import React from 'react';
import Card from 'components/Card'

export default function ValidatedDeck({chosenCard, actionType}){
    const selectMessage=()=>{
        if(actionType=="submitCard") return <p>Votre carte a été enregistrée. Attendez les autres participants.</p>
        return <p>Votre vote a été enregistré. Attendez les autres participants.</p>
    }
    return(
        <div>
            {
                selectMessage()
            }
            {chosenCard && <Card card={chosenCard}/>}
        </div>
    )
}