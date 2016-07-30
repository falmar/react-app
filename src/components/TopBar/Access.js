// Copyright 2016 David Lavieri.  All rights reserved.
// Use of this source code is governed by a MIT License
// License that can be found in the LICENSE file.

import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

import * as authActions from './../../store/actions/auth';
import {isActiveLink} from './../../utilities/misc';

const Access = (props) => {
    return (
        <div className='row align-justify'>
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
    menu: PropTypes.node.isRequired
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
            return <li><Link to='#' onClick={props.onLogout}>Sign out</Link></li>
        }

        // else show sign in menu
        return  <li className={isActiveLink(props.currentPath, /^\/login$/)}>
                    <Link to='/login'>Sign In</Link>
                </li>
    }

    render() {
        return <Access menu={this.getMenu()}/>
    }
}

// required props
AccessContainer.propTypes = {
    currentPath: PropTypes.string.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    onLogout: PropTypes.func.isRequired
}

// inject store's state to props
const mapStateToProps = ({auth}) => {
    return {
        isLoggedIn: auth.isLoggedIn
    }
}

// inject props to dispatch actions
const mapDispatchToProps = (dispatch) => {
    return {
        onLogout: () => {
            return dispatch(
                authActions.logout()
            );
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(AccessContainer);
