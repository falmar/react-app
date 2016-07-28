// Copyright 2016 David Lavieri.  All rights reserved.
// Use of this source code is governed by a MIT License
// License that can be found in the LICENSE file.

import axios from 'axios';
import * as types from './../constants/auth';
import {getAPIUrl} from './../../utilities/api';

const loginPending = () => {
    return {
        type: types.LOGIN_PENDING
    }
}

const loginFulfilled = (data) => {
    return {
        type: types.LOGIN_FULFILLED,
        payload: data
    }
}

const loginRejected = (data) => {
    return {
        type: types.LOGIN_REJECTED,
        payload: data
    }
}

export {loginPending, loginFulfilled, loginRejected};

const login = (credentials) => (dispatch, getState) => {
    return new Promise((resolve, reject) => {
        const {auth} = getState();

        if(!auth.isFetching) {
            dispatch(loginPending());
            axios.post(
                getAPIUrl('/login'),
                credentials
            ).then(resp => {
                dispatch(loginFulfilled(resp.data));
                resolve(resp.data);
            }).catch(resp => {
                dispatch(loginRejected(resp.data));
                reject(resp.data);
            });
        } else {
            reject(new Error('It is requesting'));
        }
    });
}

const logout = () => {
    return {
        type: types.LOGOUT
    }
}

export {login, logout};
