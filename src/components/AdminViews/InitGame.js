import React, { useState } from "react";
import { INIT_GAME } from "graphQL/mutations";
import ChoiceDeck from "components/PlayerViews/PlayerDeck/ChoiceDeck";
import { GET_DECK } from "graphQL/queries";
import { useQuery, useMutation } from "@apollo/react-hooks";
import Loading from "components/Loading";
import Card from "components/Card";
import MysteryCard from "components/MysteryCard";

export default function InitGame({ gameInfo, userId }) {
  const { turnDeck } = gameInfo;
  const gameId = gameInfo.id;
  const submittedCard = turnDeck.find((el) => el.owner === userId);
  const [currentWord, setCurrentWord] = useState("");
  const [chosenCard, setChosenCard] = useState();
  const [submitted, setSubmitted] = useState();
  const [cards, setCards] = useState([]);

  const { loading } = useQuery(GET_DECK, {
    variables: { gameId },
    onCompleted({ getDeck }) {
      setCards(getDeck.cards);
      submittedCard &&
        setChosenCard(
          getDeck.cards.find((card) => submittedCard.card.id === card.id)
        );
    },
    fetchPolicy: "network-only",
    onError(...error) {
      console.log(error);
    },
  });

  const [initGame, initGameCall] = useMutation(INIT_GAME, {
    variables: {
      gameId,
      cardId: chosenCard && chosenCard.id,
      currentWord,
    },
  });

  if (loading) return <Loading />;

  return (
    <>
      <div className="row">
        <hr />
        <h4 className="center">Commencer un nouveau tour</h4>
        <hr />
        <div className="col m6 s12">
          <h5>Ma carte</h5>
          {chosenCard ? (
            <Card card={chosenCard} fullSize={true} />
          ) : (
            <MysteryCard />
          )}
        </div>
        <div className="col m6 s12">
          <h5>Mon mot</h5>
          <input
            placeholder="le mot illustrant votre carte"
            value={currentWord}
            onChange={(e) => setCurrentWord(e.target.value)}
          />
        </div>
        <div className="col s12 center">
          <button
            className={`btn ${
              (!currentWord || !chosenCard || initGameCall.loading) &&
              "disabled"
            }`}
            onClick={() => initGame()}
          >
            {initGameCall.loading && (
              <i className="material-icons">access_time</i>
            )}
            VALIDER MON CHOIX
          </button>
        </div>
      </div>
      <hr />
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
  );
}
