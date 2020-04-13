import React from 'react';

const styles ={
    red:{color:"#E42343"},
    orange:{color: "#EE6402"},
    yellow:{color:"#F7B030"},
    green:{color: "#1EBE8B"},
    blue:{color: "#197D9E"}
}

export default function Sloggan(){
    return(
        <>
            <span style={styles.red}>I</span>
            <span style={styles.orange}>m</span>
            <span style={styles.yellow}>a</span>
            <span style={styles.green}>g</span>
            <span style={styles.blue}>i</span>
            <span style={styles.red}>n</span>
            <span style={styles.orange}>a</span>
            <span style={styles.yellow}>a</span>
            <span style={styles.green}>a</span>
            <span style={styles.blue}>a</span>
            <span style={styles.red}>t</span>
            <span style={styles.orange}>i</span>
            <span style={styles.yellow}>o</span>
            <span style={styles.green}>n</span>
            <span style={styles.blue}>!</span>
        </>
    )
}