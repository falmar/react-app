// Copyright 2016 David Lavieri.  All rights reserved.
// Use of this source code is governed by a MIT License
// License that can be found in the LICENSE file.

jest.unmock('./../auth.js');

import * as types from './../../constants/auth';
import * as actions from './../auth';

describe('auth actions', () => {
    it('should return logout action', () => {
        const expectedAction = {
            type: types.LOGOUT
        };

        expect(
            actions.logout()
        ).toEqual(expectedAction);
    });

    it('should return login pending action', () => {
        const expectedAction = {
            type: types.LOGIN_PENDING
        }

        expect(
            actions.loginPending()
        ).toEqual(expectedAction);
    });

    it('should return login fulfilled action', () => {
        const payload = {
            user: {name: 'fake'},
            token: 'super-token'
        };

        const expectedAction = {
            type: types.LOGIN_FULFILLED,
            payload
        }

        expect(
            actions.loginFulfilled(payload.user, payload.token)
        ).toEqual(expectedAction);
    });

    it('should return login rejected action', () => {
        const payload = {
            code: 123,
            message: 'credentials failed'
        };
        const expectedAction = {
            type: types.LOGIN_REJECTED,
            payload
        };

        expect(
            actions.loginRejected(payload)
        ).toEqual(expectedAction);
    });
});
