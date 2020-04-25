import React from "react";
import { ReactComponent as Baby } from "images/baby.svg";
import { ReactComponent as Brain } from "images/brain.svg";
import { ReactComponent as Knight } from "images/knight.svg";
import { ReactComponent as King } from "images/crown.svg";
import "./GameStatus.css";

export default function GameStatus({ user }) {
  const selectGrad = (user) => {
    //const level = user.totalGames;
    const level = 14;
    if (level < 5) {
      return (
        <>
          <p>Baby Dixiter</p>
          <Baby className="gamestatus__svg" />
        </>
      );
    } else if (level < 10) {
      return (
        <>
          <p>Chevalier Philosophe</p>
          <Knight className="gamestatus__svg" />
        </>
      );
    } else if (level < 15) {
      return (
        <>
          <p>Roi de la métaphore</p>
          <King className="gamestatus__svg" />
        </>
      );
    } else if (level < 20) {
      return (
        <>
          <p>Roi de la métaphore</p>
          <King className="gamestatus__svg" />
        </>
      );
    } else if (level < 25) {
      return (
        <>
          <p>Prophète Onirique</p>
          <Brain className="gamestatus__svg" />
        </>
      );
    }
  };
  return (
    <div className="gamestatus__wrapper">
      <p>GRADE</p>
      {selectGrad(user)}
    </div>
  );
}
