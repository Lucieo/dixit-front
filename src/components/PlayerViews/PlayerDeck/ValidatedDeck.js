import React from "react";
import Card from "components/Card";
import { ReactComponent as Vote } from "images/votes.svg";
import { ReactComponent as Choice } from "images/choice.svg";

export default function ValidatedDeck({ currentword, chosenCard, actionType }) {
  const selectMessage = () => {
    if (actionType === "submitCard")
      return (
        <div className="center">
          <Choice style={{ height: 100, width: 100 }} />
          <p>
            Votre carte a bien été enregistré, attendez les autres participants
          </p>
          <p>
            Vous avez choisi la carte suivante pour le mot{" "}
            <span style={{ fontWeight: "bold" }}>{currentword}</span> :{" "}
          </p>
        </div>
      );
    return (
      <div className="center">
        <Vote style={{ height: 100, width: 100 }} />
        <p>
          Votre vote a bien été enregistré, attendez les autres participants
        </p>
        <p>
          Le mot était{" "}
          <span style={{ fontWeight: "bold" }}>{currentword} </span>
          et vous avez voté pour la carte suivante :
        </p>
      </div>
    );
  };
  return (
    <div>
      {selectMessage()}
      {chosenCard && <Card card={chosenCard} />}
    </div>
  );
}
