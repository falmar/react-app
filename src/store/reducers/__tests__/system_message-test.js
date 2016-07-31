// Copyright 2016 David Lavieri.  All rights reserved.
// Use of this source code is governed by a MIT License
// License that can be found in the LICENSE file.

/* eslint no-invalid-this: "off" */
/* eslint no-undefined: "off" */
/* eslint func-names: "off" */
/* eslint prefer-arrow-callback: "off" */

jest.unmock('./../../constants/system_message');

import * as types from './../../constants/system_message';
import reducer, {initialState} from './../system_message';


describe('system message reducer', () => {

    beforeEach(function() {
        this.messages = [{
            code: 1,
            message: 'some1',
            humanMessage: 'READ IT',
            type: types.TYPE_INFO
        }, {
            code: 2,
            message: 'some2',
            humanMessage: 'why wont you read it? :c',
            type: types.TYPE_ERROR
        }];
    });

    it('should return initialState', () => {
        expect(
            reducer(undefined, {type: undefined})
        ).toEqual(initialState)
    });

    it('should return state with new message', function () {
        const message = this.messages[0];

        const expectedState = [{
                ...message,
                count: 1
            },
            ...initialState
        ]

        expect(
            reducer(initialState, {
                type: types.ADD,
                payload: message
            })
        ).toEqual(expectedState);
    });

    it('should return same message if a message same code exist', function() {
        const messages = [{
            ...this.messages[0],
            count: 1
        },{
            ...this.messages[1],
            count: 1
        }];

        const message = messages[0];

        const expectedState = [{
                ...messages[0],
                count: 2
            }, {
                ...messages[1],
                count: 1
            }
        ];

        expect(
            reducer(messages, {
                type: types.ADD,
                payload: message
            })
        ).toEqual(expectedState);
    });

    it('should delete the message', function() {
        const messages = this.messages;

        const expectedState = [
            messages[0]
        ];

        expect(
            reducer(messages, {
                type: types.DELETE,
                payload: 2
            })
        ).toEqual(expectedState);
    });
})
