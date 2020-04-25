import React from "react";
import SelectPlayerDeck from "components/PlayerViews/PlayerDeck/SelectPlayerDeck";
import VotePlayerDeck from "components/PlayerViews/PlayerDeck/VotePlayerDeck";
import PointsDisplay from "components/PlayerViews/PointsDisplay";
import WaitForInit from "components/PlayerViews/WaitForInit";

export default function PlayerViews({ gameInfo, gameMode, userId }) {
  const selectGameView = () => {
    if (gameMode === "init") return <WaitForInit gameInfo={gameInfo} />;
    if (gameMode === "select")
      return <SelectPlayerDeck gameInfo={gameInfo} userId={userId} />;
    if (gameMode === "vote")
      return <VotePlayerDeck gameInfo={gameInfo} userId={userId} />;
    if (gameMode === "showPoints")
      return <PointsDisplay gameInfo={gameInfo} userId={userId} />;
  };
  return <div>{selectGameView()}</div>;
}
