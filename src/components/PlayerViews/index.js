import React, { useState, useEffect } from "react";
import SelectPlayerDeck from "components/PlayerViews/PlayerDeck/SelectPlayerDeck";
import VotePlayerDeck from "components/PlayerViews/PlayerDeck/VotePlayerDeck";
import PointsDisplay from "components/PlayerViews/PointsDisplay";
import WaitForInit from "components/PlayerViews/WaitForInit";
import { useSubscription } from "@apollo/react-hooks";
import { GAME_ACTION } from "graphQL/subscriptions";
import Loading from "components/Loading";
import { GET_DECK } from "graphQL/queries";
import { useQuery } from "@apollo/react-hooks";

export default function PlayerViews({ gameInfo, gameMode, userId }) {
  const findSubmittedCard = () => {
    return gameMode === "select"
      ? gameInfo.turnDeck.find((el) => el.owner === userId)
      : gameInfo.turnVotes.find((el) => el.owner === userId);
  };
  const [userCards, setUserCards] = useState([]);
  const [submittedCard, setSubmittedCard] = useState(findSubmittedCard());
  console.log("SUBMITTED CARD IS", submittedCard);
  const [turnDeck, setTurnDeck] = useState(gameInfo.turnDeck);
  const [turnVotes, setTurnVotes] = useState(gameInfo.turnVotes);
  const { dataSub, loadingSub } = useSubscription(GAME_ACTION, {
    variables: { gameId: gameInfo.id },
    onSubscriptionData: ({ client, subscriptionData }) => {
      const data = subscriptionData.data.gameAction;
      console.log("NEW GAME ACTION RECEIVED", data);
      if (data.actionType === "submitCard") {
        setTurnDeck([...turnDeck, data.action]);
      } else {
        setTurnVotes([...turnVotes, data.action]);
      }
      if (data.action.owner === userId) {
        setSubmittedCard(data.action.card);
      }
    },
    onError(...error) {
      console.log(error);
    },
  });

  const { loading } = useQuery(GET_DECK, {
    variables: { gameId: gameInfo.id },
    onCompleted({ getDeck }) {
      setUserCards(getDeck.cards);
      console.log("GETTING USER DECK", getDeck.cards);
    },
    fetchPolicy: "network-only",
    onError(...error) {
      console.log(error);
    },
  });

  useEffect(() => {
    setSubmittedCard(findSubmittedCard());
  }, [gameInfo]);

  if (loading) return <Loading />;

  const selectGameView = () => {
    if (gameMode === "init") return <WaitForInit gameInfo={gameInfo} />;
    if (gameMode === "select")
      return (
        <SelectPlayerDeck
          gameInfo={gameInfo}
          userId={userId}
          turnDeck={turnDeck}
          turnVotes={turnVotes}
          cards={userCards}
          submittedCard={submittedCard}
        />
      );
    if (gameMode === "vote")
      return (
        <VotePlayerDeck
          gameInfo={gameInfo}
          userId={userId}
          turnDeck={turnDeck}
          turnVotes={turnVotes}
          userCards={userCards}
          submittedCard={submittedCard}
        />
      );
    if (gameMode === "showPoints")
      return <PointsDisplay gameInfo={gameInfo} userId={userId} />;
  };
  return <div>{selectGameView()}</div>;
}
