// Copyright 2016 David Lavieri.  All rights reserved.
// Use of this source code is governed by a MIT License
// License that can be found in the LICENSE file.

/* eslint no-invalid-this: "off" */
/* eslint no-undefined: "off" */
/* eslint func-names: "off" */

jest.unmock('./../ticket');

import moment from 'moment';
import reducer, {initialState} from './../ticket';
import * as types from './../../constants/ticket';


describe('ticket reducer', () => {
    beforeEach(function() {
        this.ticket = {
            id: 1,
            title: 'newly ticket',
            date: moment()
        };
    })

    it('should return initital state', () => {
        expect(
            reducer(undefined, {})
        ).toEqual(initialState);
    });

    it('should add a new ticket', function() {
        const ticket = this.ticket;

        const expectedState = {
            list: {
                data: [ticket]
            }
        };

        expect(
            reducer(initialState, {
                type: types.ADD_TICKET,
                payload: ticket
            })
        ).toEqual(expectedState);
    });

    it('should update the ticket', function() {
        const oTicket = this.ticket;
        const uTicket = {
            ...this.ticket,
            title: 'updated ticket'
        };

        const initState = {
            list: {
                data: [oTicket]
            }
        };

        const expectedState = {
            list: {
                data: [uTicket]
            }
        };

        expect(
            reducer(initState, {
                type: types.UPDATE_TICKET,
                payload: uTicket
            })
        ).toEqual(expectedState);
    });

    it('should delete the ticket', function() {
        const ticket = this.ticket;

        const initState = {
            list: {
                data: [ticket]
            }
        };

        const expectedState = {
            list: {
                data: []
            }
        };

        expect(
            reducer(initState, {
                type: types.DELETE_TICKET,
                payload: ticket.id
            })
        ).toEqual(expectedState);
    });
});
