// Copyright 2016 David Lavieri.  All rights reserved.
// Use of this source code is governed by a MIT License
// License that can be found in the LICENSE file.

import React, {Component, PropTypes} from 'react';
import {Link, browserHistory} from 'react-router';
import {connect} from 'react-redux';

import * as authActions from './../../store/actions/auth';
import {isActiveLink} from './../../utilities/misc';
import {removeAuthHeader} from './../../utilities/auth';

const Access = (props) => {
    return (
        <div className='row align-justify'>
            <div className='column' style={{whiteSpace: 'nowrap', lineHeight: '38px'}}>
                Hello, {props.username}
            </div>
            <div className='column'>
                <ul className='menu'>
                    {props.menu}
                </ul>
            </div>
        </div>
    )
}

// required props
Access.propTypes = {
    menu: PropTypes.node.isRequired,
    username: PropTypes.string.isRequired
}

class AccessContainer extends Component {
    constructor(props) {
        super(props)

        // bind methods; React Component do not auto-bind methods
        this.getMenu = this.getMenu.bind(this);
    }

    getMenu () {
        const {props} = this;

        // if logged in then show sign out menu
        if(props.isLoggedIn) {
            return <li><a href='#' onClick={props.onLogout}>Sign out</a></li>
        }

        // else show sign in menu
        return  <li className={isActiveLink(props.currentPath, /^\/login/) ? 'active' : ''}>
                    <Link to='/login'>Sign In</Link>
                </li>
    }

    render() {
        const {props, getMenu} = this;

        return <Access
            username={props.username}
            menu={getMenu()}
            />
    }
}

// required props
AccessContainer.propTypes = {
    currentPath: PropTypes.string.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    onLogout: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired
}

// inject store's state to props
const mapStateToProps = ({auth}) => {
    return {
        isLoggedIn: auth.isLoggedIn,
        username: auth.user.username
    }
}

// inject props to dispatch actions
const mapDispatchToProps = (dispatch) => {
    return {
        onLogout: () => {
            dispatch(
                authActions.logout()
            );

            removeAuthHeader();
            browserHistory.push('/login');
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(AccessContainer);
