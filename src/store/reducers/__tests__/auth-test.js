// Copyright 2016 David Lavieri.  All rights reserved.
// Use of this source code is governed by a MIT License
// License that can be found in the LICENSE file.

/* eslint no-undefined: "off" */

jest.unmock('./../auth.js');

import * as types from './../../constants/auth';
import reducer, {initialState} from './../auth';

describe('auth reducer', () => {
    it('should return the initial state', () => {
        expect(
            reducer(undefined, {type: undefined})
        ).toEqual(initialState)
    });

    it('should set isFetching to true', () => {
        const expectedState = {
            ...initialState,
            isFetching: true
        }

        expect(
            reducer(initialState, {type: types.LOGIN_PENDING})
        ).toEqual(expectedState)
    });

    it('should set isFetching to false and set user and token', () => {
        const response = {
            user: {id: 1, name: 'fake user'},
            token: 'super-encrypted-no-joke'
        }

        const initState = {
            ...initialState,
            isFetching: true
        }

        const expectedState = {
            ...initialState,
            ...response,
            isFetching: false,
            isLoggedIn: true
        }

        expect(
            reducer(initState, {
                type: types.LOGIN_FULFILLED,
                payload: response
            })
        ).toEqual(expectedState)
    });

    it('should set isFetching to false', () => {
        const initState = {
            ...initialState,
            isFetching: true
        }

        const expectedState = {
            ...initialState,
            isFetching: false,
            isLoggedIn: false
        }

        expect(
            reducer(initState, {
                type: types.LOGIN_REJECTED,
                payload: {
                    code: 123,
                    message: 'login failed :/'
                }
            })
        ).toEqual(expectedState)
    });

    it('should set state to initial state', () => {
        const initState = {
            ...initialState,
            isFetching: false,
            user: {id: 5, name: 'who-knows'},
            token: 'not-so-encrypted',
            isLoggedIn: true
        }

        expect(
            reducer(initState, {type: types.LOGOUT})
        ).toEqual(initialState)
    });
});
