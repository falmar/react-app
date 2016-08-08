// Copyright 2016 David Lavieri.  All rights reserved.
// Use of this source code is governed by a MIT License
// License that can be found in the LICENSE file.

import * as types from './../constants/auth';

const initialState = {
    user: {username: 'Guest'},
    token: '',
    isFetching: false,
    isLoggedIn: false
}

export {initialState};

export default (state = initialState, action) => {
    switch(action.type) {
        case types.LOGIN_PENDING:
            return {
                ...state,
                isFetching: true
            };
        case types.LOGIN_FULFILLED:
            return {
                ...state,
                user: action.payload.claims.user,
                token: action.payload.token,
                isFetching: false,
                isLoggedIn: true
            };
        case types.LOGIN_REJECTED:
        case types.LOGOUT:
            return {
                ...initialState,
                isFetching: false,
                isLoggedIn: false
            };
        default:
            return state;
    }
}
