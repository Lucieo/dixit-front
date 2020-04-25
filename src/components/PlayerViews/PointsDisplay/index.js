import React from "react";
import Card from "components/Card";

export default function PointsDisplay({ gameInfo, userId }) {
  const { turnDeck, turnPoints, turnVotes, players, creator } = gameInfo;
  const playerPoints = turnPoints.find((point) => point.player === userId);
  return (
    <div className="center">
      <p>Le mot pour ce tour</p>
      <h5>{gameInfo.currentWord}</h5>
      <hr />

      {playerPoints.points > 0 ? (
        <h4>Bravo vous avez gagné {playerPoints.points} points</h4>
      ) : (
        <h4>Dommage {playerPoints.points} pour vous sur ce tour...</h4>
      )}

      <div className="row">
        {turnPoints.map((points, idx) => {
          const card = turnDeck.find((card) => {
            return card.owner === points.player;
          }).card;
          const owner = players.find((player) => player.id === points.player);
          const votes = turnVotes
            .filter((vote) => vote.card.id === card.id)
            .map((vote) => players.find((player) => player.id === vote.owner));

          return (
            <Card
              key={idx}
              card={card}
              owner={owner}
              votes={votes}
              isOwnCard={owner.id === userId}
              isTurnMasterCard={owner.id === gameInfo.players[gameInfo.turn].id}
            />
          );
        })}
      </div>
    </div>
  );
}
