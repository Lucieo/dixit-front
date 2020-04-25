import React from "react";
import "./Game.css";
import endGif from "images/dab.gif";
import PlayerCardIcon from "components/PlayerIcons/PlayerCardIcon";
import PlayerListIcon from "components/PlayerIcons/PlayerListIcon";

const GameOver = ({ gameInfo }) => {
  const { gamePoints, players } = gameInfo;
  const podium = gamePoints
    .map((point) => {
      const playerInfo = players.find((player) => point.player === player.id);
      return { points: point.points, player: playerInfo };
    })
    .sort((a, b) => b.points - a.points);
  const winner = podium.splice(0, 1)[0];
  console.log("WINNER", winner);

  console.log("PODIUM", podium);
  return (
    <div className="center">
      <h3>GAME OVER BITCHES</h3>
      <img className="game-over__gif" src={endGif} alt="artist" />
      <div>
        <h5>And the winner is {winner.player.name}!</h5>
        <PlayerCardIcon player={winner.player} size="big" />
        <h6>avec {winner.points} points</h6>
        <h5>le reste du podium</h5>
        <ul>
          {podium.map((player, idx) => (
            <PlayerListIcon
              player={player.player}
              points={player.points}
              key={idx}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GameOver;
