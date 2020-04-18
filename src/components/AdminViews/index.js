import React, { useState, useEffect } from "react";
import SelectPhase from "components/AdminViews/SelectPhase";
import VotePhase from "components/AdminViews/VotePhase";
import InitGame from "components/AdminViews/InitGame";
import { useSubscription } from "@apollo/react-hooks";
import { GAME_ACTION } from "graphQL/subscriptions";

export default function AdminViews({ gameInfo, gameMode, userId }) {
  const [turnCards, setTurnCards] = useState(gameInfo.turnDeck);
  const [turnVotes, setTurnVotes] = useState(gameInfo.turnVotes);
  const { dataSub, loadingSub } = useSubscription(GAME_ACTION, {
    variables: { gameId: gameInfo.id },
    onSubscriptionData: ({ client, subscriptionData }) => {
      const data = subscriptionData.data.gameAction
      if(data.actionType==="submitCard"){
        setTurnCards([...turnCards, subscriptionData.data.gameAction.action]);
      }
      else{
        setTurnVotes([...turnVotes, subscriptionData.data.gameAction.action]);
      }
    },
    onError(...error) {
      console.log(error);
    },
  });

  useEffect(()=>{
    setTurnCards(gameInfo.turnDeck)
  }, [gameInfo.turnDeck])

  console.log(turnVotes, "turnVotes");
  const selectAdminControls = () => {
    if (gameMode === "init")
      return <InitGame gameInfo={gameInfo} userId={userId} />;
    if (gameMode === "select")
      return (
        <SelectPhase
            gameId={gameInfo.id}
          cards={turnCards}
          currentWord={gameInfo.currentWord}
          players={gameInfo.players}
          userId={userId}
        />
      );
    if (gameMode === "vote") return <VotePhase
        currentWord={gameInfo.currentWord}
        cards={turnCards}
        players={gameInfo.players} 
        votes={turnVotes}
        userId={userId}
        gameId={gameInfo.id}
        />;
  };
  return <div>{selectAdminControls()}</div>;
}
