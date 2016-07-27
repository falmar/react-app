// Copyright 2016 David Lavieri.  All rights reserved.
// Use of this source code is governed by a MIT License
// License that can be found in the LICENSE file.

import {fetchable} from './../commonInitState';
import * as types from './../constants/ticket';

const initialState = {
    list: {
        ...fetchable
    }
};

export {initialState};

const listReducer = (state, action) => {
    switch(action.type) {
        case types.ADD_TICKET:
            return {
                ...state,
                data: [
                    ...state.data,
                    action.payload
                ]
            }
        case types.UPDATE_TICKET:
            return {
                ...state,
                data: state.data.map(ticket => {
                    if(ticket.id === action.payload.id) {
                        return action.payload
                    }

                    return ticket
                })
            }
        case types.DELETE_TICKET:
            return {
                ...state,
                data: state.data.filter(ticket => {
                    if(ticket.id === action.payload) {
                        return false
                    }

                    return true
                })
            }
        case types.FETCH_PENDING:
            return {
                ...state,
                isFetching: true
            }
        case types.FETCH_FULFILLED:
            return {
                ...state,
                isFetching: false,
                fetchedAt: action.fetchedAt,
                data: action.payload
            }
        case types.FETCH_REJECTED:
            return {
                ...state,
                isFetching: false
            }
        default:
            return state;
    }
}

export default (state = initialState, action) => {
    switch(action.type) {
        default:
            return {
                ...state,
                list: listReducer(state.list, action)
            };
    }
};
