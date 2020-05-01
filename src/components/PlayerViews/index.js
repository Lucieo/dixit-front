import React, { useState } from "react";
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
  const [userCards, setUserCards] = useState([]);
  const [turnDeck, setTurnDeck] = useState(gameInfo.turnDeck);
  const [turnVotes, setTurnVotes] = useState(gameInfo.turnVotes);
  const { dataSub, loadingSub } = useSubscription(GAME_ACTION, {
    variables: { gameId: gameInfo.id },
    onSubscriptionData: ({ client, subscriptionData }) => {
      const data = subscriptionData.data.gameAction;
      if (data.actionType === "submitCard") {
        setTurnDeck([...turnDeck, subscriptionData.data.gameAction.action]);
      } else {
        setTurnVotes([...turnVotes, subscriptionData.data.gameAction.action]);
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
        />
      );
    if (gameMode === "showPoints")
      return <PointsDisplay gameInfo={gameInfo} userId={userId} />;
  };
  return <div>{selectGameView()}</div>;
}
