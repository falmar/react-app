// Copyright 2016 David Lavieri.  All rights reserved.
// Use of this source code is governed by a MIT License
// License that can be found in the LICENSE file.

/* eslint no-invalid-this: "off" */
/* eslint no-undefined: "off" */
/* eslint func-names: "off" */
/* eslint prefer-arrow-callback: "off" */

jest.unmock('./../ticket');

import moment from 'moment';
import reducer, {initialState} from './../ticket';
import * as types from './../../constants/ticket';


describe('ticket reducer', () => {
    beforeEach(function() {
        this.ticket = {
            id: 3,
            title: 'newly ticket',
            date: moment()
        };

        this.tickets = [{
            id: 1,
            title: 'not so new ticket',
            date: moment()
        },{
            id: 2,
            title: 'elder ticket',
            date: moment()
        }];
    })

    it('should return initital state', () => {
        expect(
            reducer(undefined, {})
        ).toEqual(initialState);
    });

    it('should add a new ticket', function() {
        const ticket = this.ticket;

        const expectedState = {
            ...initialState,
            list: {
                ...initialState.list,
                data: [ticket]
            }
        };

        expect(
            reducer(initialState, {
                type: types.ADD,
                payload: ticket
            })
        ).toEqual(expectedState);
    });

    it('should update the ticket', function() {
        const tickets = this.tickets;

        const uTicket = {
            ...tickets[0],
            title: 'updated ticket'
        };

        const initState = {
            list: {
                data: tickets
            }
        };

        const expectedState = {
            list: {
                data: [
                    uTicket,
                    tickets[1]
                ]
            }
        };

        expect(
            reducer(initState, {
                type: types.UPDATE,
                payload: uTicket
            })
        ).toEqual(expectedState);
    });

    it('should delete the ticket', function() {
        const tickets = this.tickets;

        const initState = {
            list: {
                data: tickets
            }
        };

        const expectedState = {
            list: {
                data: [
                    tickets[1]
                ]
            }
        };

        expect(
            reducer(initState, {
                type: types.DELETE,
                payload: tickets[0].id
            })
        ).toEqual(expectedState);
    });

    describe('fetching process', () => {
        it('should set the list to isFetching true', () => {
            const initState = {
                ...initialState,
                list: {
                    ...initialState.list,
                    isFetching: true
                }
            }

            const expectedState = {
                ...initialState,
                list: {
                    ...initialState.list,
                    isFetching: true
                }
            }

            expect(
                reducer(initState, {
                    type: types.FETCH_PENDING
                })
            ).toEqual(expectedState);
        });

        it('should set fetching to false and add new data', function() {
            const tickets = this.tickets;
            const now = moment()

            const initState = {
                ...initialState,
                list: {
                    ...initialState.list,
                    isFetching: true
                }
            }

            const expectedState = {
                ...initialState,
                list: {
                    ...initialState.list,
                    data: tickets,
                    fetchedAt: now
                }
            }

            expect(
                reducer(initState, {
                    type: types.FETCH_FULFILLED,
                    payload: tickets,
                    fetchedAt: now
                })
            ).toEqual(expectedState)
        });

        it('should set isFetching to false on error', () => {
            const initState = {
                ...initialState,
                list: {
                    ...initialState.list,
                    isFetching: true
                }
            }

             const expectedState = {
                ...initialState,
                list: {
                    ...initialState.list,
                    isFetching: false
                }
            }

            expect(
                reducer(initState, {
                    type: types.FETCH_REJECTED
                })
            ).toEqual(expectedState);

        });
    });
});
