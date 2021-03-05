import React from "react";
import _ from "lodash";
import { graphql } from "gatsby";

import { Layout } from "../components/index";
import { htmlToReact, withPrefix } from "../utils";

// this minimal GraphQL query ensures that when 'gatsby develop' is running,
// any changes to content files are reflected in browser
export const query = graphql`
  query($url: String) {
    sitePage(path: { eq: $url }) {
      id
    }
  }
`;

const HUBSPOT_SCRIPT_SRC =
  "https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js";

const HUBSPOT_IFRAME = `<div class="meetings-iframe-container" data-src="https://meetings.hubspot.com/radimal/getinfo?embed=true"></div>`;

export default class Page extends React.Component {
  constructor(props) {
    super(props);
    const showHubspotCalendar =
      typeof window !== `undefined` &&
      window.location.pathname.replace(/\/+$/, "") === "/signup";

    console.log("DEBUG")

    this.state = {
      showHubspotCalendar,
    };
  }

  componentDidMount() {
    if (!this.state.showHubspotCalendar) return;

    const script = document.createElement("script");
    script.src = HUBSPOT_SCRIPT_SRC;
    document.body.appendChild(script);
    this.setState({ script });
  }

  componentWillUnmount() {
    if (!this.state.showHubspotCalendar) return;

    document.body.removeChild(this.state.script);
  }

  render() {
    return (
      <Layout {...this.props}>
        <div className="outer">
          <div className="inner-medium">
            <article className="post post-full">
              <header className="post-header">
                <h1 className="post-title">
                  {_.get(this.props, "pageContext.frontmatter.title", null)}
                </h1>
                {_.get(
                  this.props,
                  "pageContext.frontmatter.subtitle",
                  null
                ) && (
                  <div className="post-subtitle">
                    {htmlToReact(
                      _.get(
                        this.props,
                        "pageContext.frontmatter.subtitle",
                        null
                      )
                    )}
                  </div>
                )}
              </header>
              {_.get(this.props, "pageContext.frontmatter.image", null) && (
                <div className="post-image">
                  <img
                    src={withPrefix(
                      _.get(this.props, "pageContext.frontmatter.image", null)
                    )}
                    alt={_.get(
                      this.props,
                      "pageContext.frontmatter.image_alt",
                      null
                    )}
                  />
                </div>
              )}
              <div className="post-content">
                {htmlToReact(_.get(this.props, "pageContext.html", null))}
              </div>

              {this.state.showHubspotCalendar && (
                <div dangerouslySetInnerHTML={{ __html: HUBSPOT_IFRAME }} />
              )}
            </article>
          </div>
        </div>
      </Layout>
    );
  }
}
