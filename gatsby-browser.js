/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// onPreRouteUpdate() and onRouteUpdate() are called before onInitialClientRender,
// use initialized flag to ensure that window.onGatsbyPreRouteUpdate() and
// window.onGatsbyRouteUpdate() will not be called before
// window.onGatsbyInitialClientRender() has run
import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import { navigate } from "gatsby";

let initialized = false;

export const onInitialClientRender = () => {
  initialized = true;
  if (
    "onGatsbyInitialClientRender" in window &&
    typeof window.onGatsbyInitialClientRender === "function"
  ) {
    window.onGatsbyInitialClientRender();
  }
  if (
    "onGatsbyRouteUpdate" in window &&
    typeof window.onGatsbyRouteUpdate === "function"
  ) {
    window.onGatsbyRouteUpdate();
  }
};

export const onRouteUpdate = () => {
  if (
    initialized &&
    "onGatsbyRouteUpdate" in window &&
    typeof window.onGatsbyRouteUpdate === "function"
  ) {
    window.onGatsbyRouteUpdate();
  }
};

export const onPreRouteUpdate = () => {
  if (
    initialized &&
    "onGatsbyPreRouteUpdate" in window &&
    typeof window.onGatsbyPreRouteUpdate === "function"
  ) {
    window.onGatsbyPreRouteUpdate();
  }
};

const onRedirectCallback = (appState) => navigate(appState?.returnTo || "/");

export const wrapRootElement = ({ element }) => {
  return (
    <Auth0Provider
      audience={process.env.GATSBY_AUTH0_AUDIENCE}
      clientId={process.env.GATSBY_AUTH0_CLIENT_ID}
      domain={process.env.GATSBY_AUTH0_DOMAIN}
      onRedirectCallback={onRedirectCallback}
      redirectUri={process.env.GATSBY_REDIRECT_URI}
    >
      {element}
    </Auth0Provider>
  );
};
