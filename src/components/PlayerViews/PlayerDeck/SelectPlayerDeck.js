import React, { useState } from "react";
import Loading from "components/Loading";
import ChoiceDeck from "./ChoiceDeck";
import ValidatedDeck from "./ValidatedDeck";
import { GET_DECK } from "graphQL/queries";
import { useQuery } from "@apollo/react-hooks";

export default function SelectPlayerDeck({
  gameInfo,
  userId,
  turnVotes,
  turnDeck,
}) {
  const { currentWord, players, turn } = gameInfo;
  const gameId = gameInfo.id;
  const submittedCard = turnDeck.find((el) => el.owner === userId);
  const [chosenCard, setChosenCard] = useState();
  const [submitted, setSubmitted] = useState();
  const [cards, setCards] = useState([]);

  const { loading } = useQuery(GET_DECK, {
    variables: { gameId },
    onCompleted({ getDeck }) {
      setCards(getDeck.cards);
      console.log("GETTING USER DECK", getDeck.cards);
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

  if (loading) return <Loading />;

  return (
    <div className="center container">
      {submittedCard || submitted ? (
        <ValidatedDeck
          currentword={currentWord}
          chosenCard={chosenCard}
          actionType={"submitCard"}
          players={gameInfo.players}
          turn={gameInfo.turn}
          turnDeck={turnDeck}
          turnVotes={turnVotes}
          cards={cards}
        />
      ) : (
        <ChoiceDeck
          gameId={gameId}
          cards={cards}
          setChosenCard={setChosenCard}
          chosenCard={chosenCard}
          setSubmitted={setSubmitted}
          actionType={"submitCard"}
          currentWord={currentWord}
          userId={userId}
          turnMaster={players[turn]}
        />
      )}
    </div>
  );
}
