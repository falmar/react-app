// Copyright 2016 David Lavieri.  All rights reserved.
// Use of this source code is governed by a MIT License
// License that can be found in the LICENSE file.

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as loginActions from './../../store/actions/auth';
import * as sysMsgActions from './../../store/actions/system_message';
import * as sysMsgTypes from './../../store/constants/system_message';
import {browserHistory} from 'react-router';
import {setAuthHeader} from './../../utilities/auth';

const Login = (props) => {
    return (
        <div className='row align-center'>
            <div className='small-12 medium-6 large-5 column'>
                <div className='callout'>
                    <form method='post' onSubmit={props.onSubmit}>
                        <h3>Sign In</h3>

                        <label>
                            Username
                            <input
                                onChange={props.onChange}
                                value={props.username}
                                type='text'
                                name='username'
                                />
                        </label>

                        <label>
                            Password
                            <input
                                onChange={props.onChange}
                                value={props.password}
                                type='password'
                                name='password'
                                />
                        </label>

                        <div className='row text-center'>
                            <div className='column'>
                                <button className='button' type='submit'>
                                    Sign In
                                </button>
                            </div>
                            <div className='column'>
                                <button
                                    onClick={props.onCancel}
                                    className='button secondary'
                                    type='button'
                                    >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

Login.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
}

class LoginComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onClickCancel() {
        browserHistory.push('/');
    }

    onChange(syntheticEvent) {
        this.setState({
            ...this.state,
            [syntheticEvent.target.getAttribute('name')]: syntheticEvent.target.value
        });
    }

    onSubmit(syntheticEvent) {
        syntheticEvent.preventDefault();
        const {props, state} = this;

        props.onLogin(
            state.username,
            state.password
        ).then(res => {
            // redirect to expected url param if exist
            // set token to localStore
            // any other action to have a complete login
            setAuthHeader(res.token)
            browserHistory.push('/');
        }).catch(err => {
            if(err === Object(err)) {
                props.addSysMsg({err});
            }

            if(typeof err === 'string') {
                props.addSysMsg({
                    code: 'AUTH_UNEXPECTED',
                    message: err,
                    humanMessage: err,
                    type: sysMsgTypes.TYPE_FAIL
                })
            }
            this.setState({password: ''});
        });
    }

    render() {
        return (
            <Login
                username={this.state.username}
                password={this.state.password}
                onChange={this.onChange}
                onSubmit={this.onSubmit}
                onCancel={this.onClickCancel}
            />
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogin: (username, password) => {
            return dispatch(
                loginActions.login({username, password})
            )
        },
        addSysMsg: (message) => {
            return dispatch(
                sysMsgActions.addMessage(message)
            )
        }
    }
}

export default connect(null, mapDispatchToProps)(LoginComponent)
