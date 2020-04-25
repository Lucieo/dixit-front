import React, { useState } from "react";
import Card from "components/Card";
import { SELECT_CARD } from "graphQL/mutations";
import { useMutation } from "@apollo/react-hooks";

export default function ChoiceDeck({
  gameId,
  cards,
  chosenCard,
  setChosenCard,
  setSubmitted,
  actionType,
  ownCard,
  currentWord,
  admin = false,
}) {
  const [submitCard, { loading }] = useMutation(SELECT_CARD, {
    variables: {
      gameId,
      cardId: chosenCard && chosenCard.id,
      actionType,
    },
    onCompleted() {
      setSubmitted(true);
    },
  });

  return (
    <div>
      {!admin && (
        <div className="center">
          <div className="row">
            <div className="col s6">
              <h5>Carte choisie</h5>
              {chosenCard && <Card card={chosenCard} fullSize={true} />}
            </div>
            <div className="col s6">
              <h5>Le mot est</h5>
              <h4>{currentWord}</h4>
              <div>
                <button
                  className={`btn ${loading && "disabled"}`}
                  onClick={() => submitCard()}
                >
                  {loading && <i className="material-icons">access_time</i>}
                  {actionType == "submitCard" ? (
                    <span>Valider ma carte</span>
                  ) : (
                    <span>Voter pour cette carte</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {actionType === "submitCard" ? (
        <h4>Vos Cartes</h4>
      ) : (
        <h4>Les cartes du jeu</h4>
      )}
      <hr />
      <div className="row playerDeck">
        {cards &&
          cards.map((card, index) => (
            <Card
              card={card}
              key={index}
              selected={chosenCard.id === card.id}
              clickAction={() => setChosenCard(card)}
              actionType={actionType}
              isOwnCard={ownCard && card === ownCard}
            />
          ))}
      </div>
    </div>
  );
}
