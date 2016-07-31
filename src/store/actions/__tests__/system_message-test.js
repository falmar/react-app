// Copyright 2016 David Lavieri.  All rights reserved.
// Use of this source code is governed by a MIT License
// License that can be found in the LICENSE file.

jest.unmock('./../system_message');

import * as types from './../../constants/system_message';
import * as actions from './../system_message';

describe('system messages action', () => {
    it('should return add message action', () => {
        const message = {
            id: 1,
            message: 'some back-end or used defined message',
            humanMessage: 'human readable message',
            type: types.TYPE_ERROR
        };

        const expectedAction = {
            type: types.ADD,
            payload: message
        };

        expect(
            actions.addMessage(message)
        ).toEqual(expectedAction);
    });

    it('should return delete message action', () => {
        const expectedAction = {
            type: types.DELETE,
            payload: 5
        };

        expect(
            actions.deleteMessage(5)
        ).toEqual(expectedAction);
    });
});
