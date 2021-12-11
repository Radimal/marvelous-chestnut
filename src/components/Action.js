import React from "react"
import _ from "lodash"
import { useAuth0 } from "@auth0/auth0-react"

import { Link, withPrefix, classNames } from "../utils"
import Icon from "./Icon"

export default function Action(props) {
  const { loginWithRedirect } = useAuth0()

  let action = _.get(props, "action", null)
  let action_style = _.get(action, "style", null) || "link"
  let action_icon = _.get(action, "icon", null) || "arrow-left"
  let action_icon_pos = _.get(action, "icon_position", null) || "left"

  const shouldAuthenticate = action.url === "/signup" && action.label === "Get Started"

  return shouldAuthenticate ? (
    <Link
      onClick={() => loginWithRedirect({ screen_hint: "signup" })}
      className={classNames({
        button: action_style === "primary" || action_style === "secondary",
        secondary: action_style === "secondary",
      })}
    >
      <span>{_.get(action, "label", null)}</span>
    </Link>
  ) : (
    <Link
      to={withPrefix(_.get(action, "url", null))}
      {...(_.get(action, "new_window", null) ? { target: "_blank" } : null)}
      {...(_.get(action, "new_window", null) || _.get(action, "no_follow", null)
        ? { rel: (_.get(action, "new_window", null) ? "noopener " : "") + (_.get(action, "no_follow", null) ? "nofollow" : "") }
        : null)}
      className={classNames({
        button: action_style === "primary" || action_style === "secondary",
        secondary: action_style === "secondary",
        "has-icon": _.get(action, "has_icon", null),
      })}
    >
      {_.get(action, "has_icon", null) && <Icon {...props} icon={action_icon} />}
      <span className={classNames({ "order-first": action_icon_pos === "right" })}>{_.get(action, "label", null)}</span>
    </Link>
  )
}
