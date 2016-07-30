// Copyright 2016 David Lavieri.  All rights reserved.
// Use of this source code is governed by a MIT License
// License that can be found in the LICENSE file.

import * as types from './../constants/system_message';

const addMessage = (message) => {
    return {
        type: types.ADD,
        payload: message
    }
};

const deleteMessage = (messageId) => {
    return {
        type: types.DELETE,
        payload: messageId
    }
};

export {addMessage, deleteMessage};
