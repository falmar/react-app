// Copyright 2016 David Lavieri.  All rights reserved.
// Use of this source code is governed by a MIT License
// License that can be found in the LICENSE file.

jest.unmock('./../auth.js');

import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import AxiosMockAdapter from 'axios-mock-adapter';
import {getAPIUrl} from './../../../utilities/api';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

import * as types from './../../constants/auth';
import * as actions from './../auth';
import {initialState} from './../../reducers/auth';

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
            claims: {
                user: {name: 'fake'}
            },
            token: 'super-token'
        };

        const expectedAction = {
            type: types.LOGIN_FULFILLED,
            payload
        }

        expect(
            actions.loginFulfilled(payload)
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

    describe('login async actions', () => {
        it('should execute the login pending and fulfilled actions', () => {
            const store = mockStore({
                auth: initialState
            });

            const credentials = {
                username: 'crazy',
                password: 'crypto'
            };

            const response = {
                claims: {
                    user: {name: 'fake user?'}
                },
                token: 'cute-token'
            };

            const axiosAdapter = new AxiosMockAdapter(axios);

            axiosAdapter.onPost(
                getAPIUrl('/login'),
                credentials
            ).reply(200, response)

            const expectedActions = [{
                type: types.LOGIN_PENDING
            },{
                type: types.LOGIN_FULFILLED,
                payload: response
            }];

            return store.dispatch(
                actions.login(credentials)
            ).then(() => {
                expect(
                    store.getActions()
                ).toEqual(expectedActions);
            });
        });

        it('should execute the login pending and fulfilled actions', () => {
            const store = mockStore({
                auth: initialState
            });

            const credentials = {
                username: 'crazy',
                password: 'crypto'
            };

            const response = {
                code: 123,
                message: 'login failed :/'
            };

            const axiosAdapter = new AxiosMockAdapter(axios);

            axiosAdapter.onPost(
                getAPIUrl('/login'),
                credentials
            ).reply(500, response)

            const expectedActions = [{
                type: types.LOGIN_PENDING
            },{
                type: types.LOGIN_REJECTED,
                payload: response
            }];

            return store.dispatch(
                actions.login(credentials)
            ).catch(() => {
                expect(
                    store.getActions()
                ).toEqual(expectedActions);
            });
        });

        it('it should not execute any action', () => {
            const store = mockStore({
                auth: {
                    ...initialState,
                    isFetching: true
                }
            });

            const credentials = {
                username: 'crazy',
                password: 'crypto'
            };

            return store.dispatch(
                actions.login(credentials)
            ).catch(() => {
                expect(
                    store.getActions()
                ).toEqual([]);
            });
        });
    });
});
