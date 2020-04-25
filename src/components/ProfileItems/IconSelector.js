import React from "react";
import "./ProfileItems.css";

const availableIcons = [
  "monster1",
  "monster2",
  "monster3",
  "monster4",
  "monster5",
  "monster6",
  "monster7",
  "monster8",
  "monster9",
  "monster10",
  "monster11",
  "monster12",
  "monster13",
  "monster14",
  "monster15",
  "monster16",
  "monster17",
  "monster18",
  "monster19",
  "monster20",
  "monster21",
  "monster22",
  "monster23",
  "monster24",
];

export default function IconSelector({ selectedIcon, setIcon }) {
  return (
    <div className="icon-selector">
      {availableIcons.map((icon, index) => (
        <div
          key={index}
          className={`material-icons small player-icon ${
            selectedIcon === icon && "selected-icon"
          }`}
          onClick={() => {
            setIcon(icon);
          }}
        >
          <img src={`../images/players/${icon}.png`} alt="player icon" />
        </div>
      ))}
    </div>
  );
}
