// Copyright 2016 David Lavieri.  All rights reserved.
// Use of this source code is governed by a MIT License
// License that can be found in the LICENSE file.

import axios from 'axios';
import * as types from './../constants/ticket';
import {getAPIUrl} from './../../utilities/api';

const addTicket = ticket => ({
    type: types.ADD_TICKET,
    payload: ticket
});

const updateTicket = ticket => ({
    type: types.UPDATE_TICKET,
    payload: ticket
});

const deleteTicket = ticketId => ({
    type: types.DELETE_TICKET,
    payload: ticketId
});

const fetchPending = () => ({
    type: types.FETCH_PENDING
});

const fetchFulfilled = (data, fetchedAt) => ({
    type: types.FETCH_FULFILLED,
    payload: data,
    fetchedAt
});

const fetchRejected = data => ({
    type: types.FETCH_REJECTED,
    payload: data
});

const fetchTickets = (params, fetchedAt) => (dispatch, getState) => {
    return new Promise((resolve, reject) => {
        const {tickets} = getState();
        const {isFetching} = tickets;

        if(!isFetching) {
            dispatch(fetchPending());

            axios.get(
                getAPIUrl('/tickets'), {
                    params
                }
            ).then(response => {
                dispatch(fetchFulfilled(response.data, fetchedAt()));
                resolve(response);
            }).catch(error => {
                let err = {};

                if(error.data) {
                    err = error.data
                }
                dispatch(fetchRejected(err));
                reject(error);
            });

        } else {
            reject(new Error('It is fetching'));
        }
    });
}

export {addTicket, updateTicket, deleteTicket, fetchTickets};
