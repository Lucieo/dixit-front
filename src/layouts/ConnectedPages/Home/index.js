import React from "react";
import { useQuery, useApolloClient } from "@apollo/react-hooks";
import { CURRENT_USER } from "graphQL/queries";
import "./Home.css";
import Loading from "components/Loading";
import CreateGame from "components/GameControls/CreateGame";
import { Link } from "react-router-dom";
import requireAuth from "components/requireAuth";
import Frame from "images/frame.svg";
import GameStatus from "components/GameStatus";

function Home() {
  const client = useApolloClient();
  const { data, loading, error } = useQuery(CURRENT_USER, {
    fetchPolicy: "network-only",
  });

  if (loading) return <Loading />;

  const user = data && data.currentUser;
  console.log(user);

  return (
    <div className="center connected-home">
      <div
        className="connected-home__avatar"
        style={{ background: `url(${Frame})` }}
      >
        <img
          src={`../images/players/${user.icon}.png`}
          alt="avatar"
          style={{ width: 100 }}
        />
      </div>
      <h5>Bienvenue</h5>
      <h4>{user.name}</h4>
      <div className="connected-home__stats">
        <h6>MATE TES STATS</h6>
        <p>Score total : {user.totalPoints} points</p>
        <p>Nombre de parties jouées : {user.totalGames}</p>
        <GameStatus user={user} />
      </div>
      <p>Profil</p>
      <Link to="/profile" className="btn">
        Modifier Mon profil
      </Link>
      <CreateGame />
    </div>
  );
}

export default requireAuth(Home);
