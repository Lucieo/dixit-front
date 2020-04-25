import React, { useState, useEffect } from "react";
import SelectPhase from "components/AdminViews/SelectPhase";
import VotePhase from "components/AdminViews/VotePhase";
import InitGame from "components/AdminViews/InitGame";
import { useSubscription } from "@apollo/react-hooks";
import { useMutation } from "@apollo/react-hooks";
import { GAME_ACTION } from "graphQL/subscriptions";
import { LAUNCH_GAME_STEP } from "graphQL/mutations";
import PointsDisplay from "components/PlayerViews/PointsDisplay";
import { ReactComponent as Badge } from "images/policeman.svg";

export default function AdminViews({ gameInfo, gameMode, userId }) {
  const gameId = gameInfo.id;
  const [turnCards, setTurnCards] = useState(gameInfo.turnDeck);
  const [turnVotes, setTurnVotes] = useState(gameInfo.turnVotes);
  const { dataSub, loadingSub } = useSubscription(GAME_ACTION, {
    variables: { gameId },
    onSubscriptionData: ({ client, subscriptionData }) => {
      const data = subscriptionData.data.gameAction;
      if (data.actionType === "submitCard") {
        setTurnCards([...turnCards, subscriptionData.data.gameAction.action]);
      } else {
        setTurnVotes([...turnVotes, subscriptionData.data.gameAction.action]);
      }
    },
    onError(...error) {
      console.log(error);
    },
  });

  const [nextTurn] = useMutation(LAUNCH_GAME_STEP, {
    variables: {
      gameId,
      step: "nextTurn",
      turnMaster: userId,
    },
  });

  useEffect(() => {
    setTurnCards(gameInfo.turnDeck);
  }, [gameInfo.turnDeck]);

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
    if (gameMode === "vote")
      return (
        <VotePhase
          currentWord={gameInfo.currentWord}
          cards={turnCards}
          players={gameInfo.players}
          votes={turnVotes}
          userId={userId}
          gameId={gameInfo.id}
        />
      );

    if (gameMode === "showPoints")
      return (
        <>
          <div className="center">
            <button className="btn" onClick={() => nextTurn()}>
              PASSER AU PROCHAIN TOUR
            </button>
          </div>
          <PointsDisplay gameInfo={gameInfo} userId={userId} />
        </>
      );
  };
  return (
    <div>
      <>
        <div>
          <Badge style={{ width: 50, height: 50 }} />
          <span>
            Vous êtes le maître du tour, à vous de controller les étapes du jeu.
          </span>
        </div>
        {selectAdminControls()}
      </>
    </div>
  );
}
