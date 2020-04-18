import React from 'react';

const styles={
    smallStyle:{
        width:30, 
        margin:5, 
    },
    regularStyle:{
        width:60, 
        border:"2px solid lightgray", 
        padding:10, 
        borderRadius:"50%"
    }
}

export default function PlayerCardIcon({player, size="regular"}){
    return(
        <div>
            <img 
                style={size==="regular"? styles.regularStyle : styles.smallStyle}
                src={`../images/players/${player.icon}.png`}/>
        </div>
    )
}