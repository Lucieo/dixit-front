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
  cards,
}) {
  const { currentWord, players, turn } = gameInfo;
  const gameId = gameInfo.id;
  const submittedCard = turnDeck.find((el) => el.owner === userId);
  console.log(submittedCard);
  const [chosenCard, setChosenCard] = useState(
    submittedCard && submittedCard.card
  );
  const [submitted, setSubmitted] = useState();

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
          userCards={cards}
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
