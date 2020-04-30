import React, { useState } from "react";
import SelectPlayerDeck from "components/PlayerViews/PlayerDeck/SelectPlayerDeck";
import VotePlayerDeck from "components/PlayerViews/PlayerDeck/VotePlayerDeck";
import PointsDisplay from "components/PlayerViews/PointsDisplay";
import WaitForInit from "components/PlayerViews/WaitForInit";
import { useSubscription } from "@apollo/react-hooks";
import { GAME_ACTION } from "graphQL/subscriptions";

export default function PlayerViews({ gameInfo, gameMode, userId }) {
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
  const selectGameView = () => {
    if (gameMode === "init") return <WaitForInit gameInfo={gameInfo} />;
    if (gameMode === "select")
      return (
        <SelectPlayerDeck
          gameInfo={gameInfo}
          userId={userId}
          turnDeck={turnDeck}
          turnVotes={turnVotes}
        />
      );
    if (gameMode === "vote")
      return (
        <VotePlayerDeck
          gameInfo={gameInfo}
          userId={userId}
          turnDeck={turnDeck}
          turnVotes={turnVotes}
        />
      );
    if (gameMode === "showPoints")
      return <PointsDisplay gameInfo={gameInfo} userId={userId} />;
  };
  return <div>{selectGameView()}</div>;
}
