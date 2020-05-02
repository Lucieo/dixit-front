import React from "react";
import Card from "components/Card";
import { LAUNCH_GAME_STEP } from "graphQL/mutations";
import { useMutation } from "@apollo/react-hooks";
import Ding from "sounds/ding.mp3";
import WaitingFor from "components/WaitingFor";

export default function VotePhase({
  cards,
  players,
  votes,
  userId,
  gameId,
  turn,
}) {
  const [launchEvaluation, { loading }] = useMutation(LAUNCH_GAME_STEP, {
    variables: {
      gameId,
      step: "launchEvaluation",
      turnMaster: userId,
    },
  });

  return (
    <div>
      {votes.length + 1 === players.length && (
        <div className="admincontrols__box">
          <p className="admincontrols__title">NOUVELLE ACTION DISPONIBLE</p>
          <p>Tout le monde a bien voté!</p>
          <audio src={Ding} autoPlay />
          <button
            className={`btn ${loading && "disabled"}`}
            onClick={() => launchEvaluation()}
          >
            {loading && <i className="material-icons">access_time</i>}
            DISTRIBUER LES POINTS
          </button>
        </div>
      )}
      <div>
        <WaitingFor players={players} turn={turn} received={votes} />
      </div>
      <div className="row">
        {cards.map((card, idx) => (
          <Card
            key={idx}
            card={card.card}
            owner={players.find((el) => el.id === card.owner)}
            isOwnCard={card.owner === userId}
          />
        ))}
      </div>
    </div>
  );
}
