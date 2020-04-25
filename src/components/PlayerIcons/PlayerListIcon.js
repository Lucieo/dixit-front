import React from "react";

export default function PlayerListIcon({ player, admin, points }) {
  return (
    <>
      <li className="collection-item">
        <span>
          <img
            style={{ width: 30, marginRight: 10 }}
            src={`../images/players/${player.icon}.png`}
          />
        </span>
        <span>{player.name} </span> {admin && <span> - GAME MASTER</span>}
        {points && <span> : {points} points</span>}
      </li>
    </>
  );
}
