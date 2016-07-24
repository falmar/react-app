// Copyright 2016 David Lavieri.  All rights reserved.
// Use of this source code is governed by a MIT License
// License that can be found in the LICENSE file.

import * as types from './../constants/ticket';

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

export {addTicket, updateTicket, deleteTicket};
