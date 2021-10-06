import React from 'react';
import _ from 'lodash';
import { useAuth0 } from "@auth0/auth0-react"

import {Link, withPrefix, classNames} from '../utils';
import Icon from './Icon';

const { loginWithRedirect } = useAuth0()
export default class Action extends React.Component {
    render() {
        let action = _.get(this.props, 'action', null);
        let action_style = _.get(action, 'style', null) || 'link';
        let action_icon = _.get(action, 'icon', null) || 'arrow-left';
        let action_icon_pos = _.get(action, 'icon_position', null) || 'left';
        return (
            <Link onClick={() => loginWithRedirect()}></Link>
        );
    }
}
