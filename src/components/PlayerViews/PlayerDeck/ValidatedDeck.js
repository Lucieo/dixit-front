import React from "react";
import Card from "components/Card";
import { ReactComponent as Vote } from "images/votes.svg";
import { ReactComponent as Choice } from "images/choice.svg";
import WaitingFor from "components/WaitingFor";

export default function ValidatedDeck({
  currentword,
  chosenCard,
  actionType,
  players,
  turn,
  turnDeck,
  turnVotes,
  cards,
}) {
  const selectMessage = () => {
    if (actionType === "submitCard")
      return (
        <div className="center">
          <Choice style={{ height: 100, width: 100 }} />
          <p>Votre carte a bien été enregistrée.</p>
          <WaitingFor players={players} turn={turn} received={turnDeck} />
          <p>
            Vous avez choisi la carte suivante pour le mot
            <span style={{ fontWeight: "bold" }}> {currentword}</span> :{" "}
          </p>
        </div>
      );
    return (
      <div className="center">
        <Vote style={{ height: 100, width: 100 }} />
        <p>Votre vote a bien été enregistré.</p>
        <WaitingFor players={players} turn={turn} received={turnVotes} />
        <p className="bold">
          {players[turn].name} a proposé le mot "{currentword}"
        </p>
        <p>Vous avez voté pour la carte suivante:</p>
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
