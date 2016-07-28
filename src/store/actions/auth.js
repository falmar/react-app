// Copyright 2016 David Lavieri.  All rights reserved.
// Use of this source code is governed by a MIT License
// License that can be found in the LICENSE file.

import * as types from './../constants/auth';

const loginPending = () => {
    return {
        type: types.LOGIN_PENDING
    }
}

const loginFulfilled = (user, token) => {
    return {
        type: types.LOGIN_FULFILLED,
        payload: {
            user,
            token
        }
    }
}

const loginRejected = (data) => {
    return {
        type: types.LOGIN_REJECTED,
        payload: data
    }
}

export {loginPending, loginFulfilled, loginRejected};

const logout = () => {
    return {
        type: types.LOGOUT
    }
}

export {logout};
