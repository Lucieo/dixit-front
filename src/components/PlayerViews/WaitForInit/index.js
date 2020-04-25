import React from "react";
import "./Wait.css";

export default function WaitForInit({ gameInfo }) {
  const { players, turn } = gameInfo;
  const turnAdmin = players[turn];
  return (
    <div className="waiting__wrapper container center">
      <img
        className="swing"
        src={`../images/players/${turnAdmin.icon}.png`}
        alt="admin icon"
      />
      <p>
        Un peu de patience {turnAdmin.name} est entrain de sélectionner une
        carte et un mot pour commencer un nouveau tour...
      </p>
    </div>
  );
}
