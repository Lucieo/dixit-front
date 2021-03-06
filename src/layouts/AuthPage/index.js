import React, { useState } from "react";
import Bg from "images/paintings.jpeg";
import { ReactComponent as Logo } from "images/idea.svg";
import "./AuthPage.css";
import Login from "layouts/AuthPage/Login";
import SignUp from "layouts/AuthPage/Signup";
import Sloggan from "components/Sloggan";

import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { ApolloProvider } from "react-apollo";

const cache = new InMemoryCache();
const link = new HttpLink({
  uri:
    process.env.NODE_ENV === "development"
      ? "http://localhost:4000/graphql"
      : "https://dixit-live.herokuapp.com/graphql",
});

const client = new ApolloClient({
  cache,
  link,
});

export default function BasicHome() {
  const [mode, setMode] = useState("login");
  return (
    <ApolloProvider client={client}>
      <div className="auth-page" style={{ background: `url(${Bg})` }}>
        <Logo className="auth-page__logo" />
        <h3 className="auth-page__title">Dixit Live</h3>
        <div className="auth-page__action">
          <h5 className="center">
            <Sloggan />
          </h5>
          {mode === "login" ? (
            <Login switchMode={() => setMode("signup")} />
          ) : (
            <SignUp switchMode={() => setMode("login")} />
          )}
        </div>
      </div>
    </ApolloProvider>
  );
}
