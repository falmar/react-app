// Copyright 2016 David Lavieri.  All rights reserved.
// Use of this source code is governed by a MIT License
// License that can be found in the LICENSE file.

import * as types from './../constants/system_message';

const initialState = [];

export {initialState};

export default (state = initialState, action) => {
    switch(action.type) {
        case types.ADD: {
            let match = false;
            const newState = state.map(message => {
                if(message.code === action.payload.code) {
                    match = true;

                    return {
                        ...message,
                        count: message.count ? message.count + 1 : 1
                    }
                }

                return message;
            });

            if(match) {
                return newState;
            }

            return [{
                    ...action.payload,
                    count: 1
                },
                ...newState
            ];
        }
        case types.DELETE:
            return state.filter(message => message.code !== action.payload);
        default:
            return state;
    }
}
