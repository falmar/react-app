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
                    {!props.isLoggedIn
                    ? <li className={isActiveLink(props.currentPath, /^\/login$/)}>
                            <Link to='/login'>Sign In</Link>
                    </li>
                    : <li>
                        <Link to='#' onClick={props.onLogout}>Sign out</Link>
                    </li>}
                </ul>
            </div>
        </div>

        )
}

Access.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    onLogout: PropTypes.func.isRequired,
    currentPath: PropTypes.string.isRequired
}

class AccessContainer extends Component {
    render() {
        const {props} = this;

        return (
            <Access currentPath={props.currentPath}
                isLoggedIn={props.isLoggedIn}
                onLogout={props.onLogout}
                />
        )
    }
}

const mapStateToProps = ({auth}) => {
    return {
        isLoggedIn: auth.isLoggedIn
    }
}

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
