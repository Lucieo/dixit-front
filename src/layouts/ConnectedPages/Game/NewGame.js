import React, { useState } from "react";
import { PlayerListIcon } from "components/PlayerIcons";
import AdminGameControls from "components/GameControls/AdminGameControls";
import PlayerControls from "components/GameControls/PlayerControls";
import { JOIN_GAME, LEAVE_GAME } from "graphQL/mutations";
import { useMutation, useSubscription, useQuery } from "@apollo/react-hooks";
import { CURRENT_USER } from "graphQL/queries";
import { PLAYER_UPDATE_SUBSCRIPTION } from "graphQL/subscriptions";

import "./Game.css";

const NewGame = ({ gameId, playerslist, creatorId }) => {
  const [creator, setCreator] = useState(creatorId);
  const [players, setPlayers] = useState([...playerslist]);
  const {
    data: { currentUser },
  } = useQuery(CURRENT_USER);
  const [joinGame, { loading, error }] = useMutation(JOIN_GAME, {
    variables: { gameId },
  });
  const [leaveGame] = useMutation(LEAVE_GAME, { variables: { gameId } });
  const { data, loadingSub } = useSubscription(PLAYER_UPDATE_SUBSCRIPTION, {
    variables: { gameId },
    onSubscriptionData: ({ client, subscriptionData }) => {
      setPlayers(subscriptionData.data.playerUpdate.players);
      setCreator(subscriptionData.data.playerUpdate.creator);
    },
  });

  const isGameAdmin = currentUser.id === creator;
  const hasJoined =
    players.map((player) => player.id).indexOf(currentUser.id) > -1;

  const renderPlayers = () => {
    return (
      <ul className="collection">
        {players.map((player, index) => (
          <PlayerListIcon
            key={index}
            player={player}
            admin={player.id === creator}
          />
        ))}
      </ul>
    );
  };

  return (
    <div className="new-game">
      <h4>Prêts pour un nouveau Dixit?</h4>
      {isGameAdmin && <AdminGameControls gameId={gameId} players={players} />}
      {!isGameAdmin && (
        <PlayerControls
          joinGame={joinGame}
          loading={loading}
          players={players}
          hasJoined={hasJoined}
        />
      )}
      <div className="row">
        <div className="new-game__rules col m6 s12">
          <p className="new-game__rules-title center">Comment ça marche?</p>
          <ul>
            <li>
              Une fois que la partie compte au minimum 3 joueurs le premier
              joueur devient maître du tour.
            </li>
            <li>Le maître du tour choisit 1 carte et 1 mot</li>
            <li>
              Les autres joueurs reçoivent le mot et choisissent une carte dans
              leur jeu
            </li>
            <li>
              Les cartes de tous les joueurs sont présentées et chacun vote pour
              la carte qu'il pense être celle du maître du tour.
            </li>
            <li>
              Si tout le monde trouve la carte du maître du tour ou personne ne
              la trouve chacun gagne 2 points, le maître du tour 0.
            </li>
            <li>
              Si certains seulement ont trouvé, ils gagnent chacun de même que
              le maître du tour 3 points
            </li>
            <li>
              Chaque joueur reçoit également 1 point par vote qu'il aura reçu
              pour sa carte.
            </li>
          </ul>
        </div>
        <div className="col m6 s12 new-game__players">
          <p className="new-game__players-title">
            Liste des joueurs connectés à cette partie
          </p>
          {players.length > 0 ? renderPlayers() : <i>Aucun joueur connecté</i>}
        </div>
      </div>
    </div>
  );
};

export default NewGame;
