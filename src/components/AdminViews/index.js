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
import "./Admin.css";

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

  const [nextTurn, { loading }] = useMutation(LAUNCH_GAME_STEP, {
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
          <div className="admincontrols__box">
            <p className="admincontrols__title">NOUVELLE ACTION DISPONIBLE</p>
            <p>
              Une fois que tout le monde a vu ses points vous pourrez passer la
              main au prochain joueur.
            </p>
            <button
              className={`btn ${loading && "disabled"}`}
              onClick={() => nextTurn()}
            >
              {loading && <i className="material-icons">access_time</i>}
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
        <div className="admin__info">
          <Badge style={{ width: 50, height: 50 }} />
        </div>
        <p>
          Vous êtes le maître du tour. C'est à vous de controller les étapes du
          jeu. Les boutons s'afficheront automatiquement pour vous signaler
          quand déclencher les actions.
        </p>
        {selectAdminControls()}
      </>
    </div>
  );
}
