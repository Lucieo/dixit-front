import React, { useState } from "react";
import Loading from "components/Loading";
import { shuffle } from "utils";
import ChoiceDeck from "./ChoiceDeck";
import ValidatedDeck from "./ValidatedDeck";

export default function VotePlayerDeck({
  gameInfo,
  userId,
  turnVotes,
  userCards,
  submittedCard,
}) {
  const gameId = gameInfo.id;
  const { turnDeck } = gameInfo;
  const { players, turn } = gameInfo;
  const [cards, setCards] = useState(shuffle(turnDeck.map((el) => el.card)));
  const [chosenCard, setChosenCard] = useState(
    submittedCard && submittedCard.card
  );
  const [submitted, setSubmitted] = useState();
  console.log("turnDeck", turnDeck);
  console.log(submittedCard, "submittedCard");
  console.log(submittedCard, "submittedCard");
  return (
    <>
      {submittedCard || submitted ? (
        <ValidatedDeck
          chosenCard={chosenCard}
          actionType={"voteForCard"}
          currentword={gameInfo.currentWord}
          players={gameInfo.players}
          turn={gameInfo.turn}
          turnDeck={turnDeck}
          turnVotes={turnVotes}
          userCards={userCards}
        />
      ) : (
        <ChoiceDeck
          gameId={gameId}
          cards={cards}
          setChosenCard={setChosenCard}
          chosenCard={chosenCard}
          setSubmitted={setSubmitted}
          actionType={"voteForCard"}
          ownCard={turnDeck.find((card) => card.owner === userId).card}
          currentWord={gameInfo.currentWord}
          turnMaster={players[turn]}
        />
      )}
    </>
  );
}
