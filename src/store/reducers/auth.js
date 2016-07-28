// Copyright 2016 David Lavieri.  All rights reserved.
// Use of this source code is governed by a MIT License
// License that can be found in the LICENSE file.

import * as types from './../constants/auth';

const initialState = {
    user: null,
    token: '',
    isFetching: false
}

export {initialState};

export default (state, action) => {
    switch(action.type) {
        case types.LOGIN_PENDING:
        case types.LOGIN_FULFILLED:
        case types.LOGIN_REJECTED:
        case types.LOGOUT:
        default:
            return state;
    }
}
