import React from "react";
import _ from "lodash";
import { useAuth0 } from "@auth0/auth0-react";

import { Link, withPrefix, classNames } from "../utils";
import Action from "./Action";
import { useApi } from "../hooks/use-api";

export function Header(props) {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  useApi();

  return (
    <header id="masthead" className="site-header outer">
      <div className="inner">
        <div className="site-header-inside">
          <div className="site-branding">
            {_.get(
              props,
              "pageContext.site.siteMetadata.header.logo_img",
              null
            ) && (
              <p className="site-logo">
                <Link to={withPrefix("/")}>
                  <img
                    src={withPrefix(
                      _.get(
                        props,
                        "pageContext.site.siteMetadata.header.logo_img",
                        null
                      )
                    )}
                    alt={_.get(
                      props,
                      "pageContext.site.siteMetadata.header.logo_img_alt",
                      null
                    )}
                  />
                </Link>
              </p>
            )}
            {_.get(props, "pageContext.frontmatter.template", null) ===
              "landing" ||
            _.get(props, "pageContext.frontmatter.template", null) ===
              "blog" ? (
              <h1
                className={classNames("site-title", {
                  "screen-reader-text": _.get(
                    props,
                    "pageContext.site.siteMetadata.header.logo_img",
                    null
                  ),
                })}
              >
                <Link to={withPrefix("/")}>
                  {_.get(props, "pageContext.site.siteMetadata.title", null)}
                </Link>
              </h1>
            ) : (
              <p
                className={classNames("site-title", {
                  "screen-reader-text": _.get(
                    props,
                    "pageContext.site.siteMetadata.header.logo_img",
                    null
                  ),
                })}
              >
                <Link to={withPrefix("/")}>
                  {_.get(props, "pageContext.site.siteMetadata.title", null)}
                </Link>
              </p>
            )}
          </div>
          {_.get(
            props,
            "pageContext.site.siteMetadata.header.nav_links",
            null
          ) &&
            _.get(
              props,
              "pageContext.site.siteMetadata.header.has_nav",
              null
            ) && (
              <React.Fragment>
                <nav
                  id="main-navigation"
                  className="site-navigation"
                  aria-label="Main Navigation"
                >
                  <div className="site-nav-inside">
                    <button id="menu-close" className="menu-toggle">
                      <span className="screen-reader-text">Open Menu</span>
                      <span className="icon-close" aria-hidden="true" />
                    </button>
                    <ul className="menu">
                      {_.map(
                        _.get(
                          props,
                          "pageContext.site.siteMetadata.header.nav_links",
                          null
                        ),
                        (action, action_idx) => {
                          let page_url = _.trim(
                            _.get(props, "pageContext.url", null),
                            "/"
                          );
                          let action_url = _.trim(
                            _.get(action, "url", null),
                            "/"
                          );
                          let action_style =
                            _.get(action, "style", null) || "link";
                          return (
                            <li
                              key={action_idx}
                              className={classNames("menu-item", {
                                "current-menu-item": page_url === action_url,
                                "menu-button": action_style !== "link",
                              })}
                            >
                              <Action {...props} action={action} />
                            </li>
                          );
                        }
                      )}
                      {isAuthenticated ? (
                        <button
                          style={{ margin: "10px" }}
                          id="logout"
                          onClick={() =>
                            logout({ returnTo: window.location.origin })
                          }
                        >
                          logout
                        </button>
                      ) : (
                        <button
                          style={{ margin: "10px" }}
                          id="login"
                          onClick={() => loginWithRedirect()}
                        >
                          login
                        </button>
                      )}
                    </ul>
                  </div>
                </nav>
                <button id="menu-open" className="menu-toggle">
                  <span className="screen-reader-text">Close Menu</span>
                  <span className="icon-menu" aria-hidden="true" />
                </button>
              </React.Fragment>
            )}
        </div>
      </div>
    </header>
  );
}
