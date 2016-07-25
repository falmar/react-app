// Copyright 2016 David Lavieri.  All rights reserved.
// Use of this source code is governed by a MIT License
// License that can be found in the LICENSE file.

import {fetchable} from './../commonInitState';

const initialState = {
    ...fetchable
};

export {initialState};

export default (state = initialState, action) => {
    switch(action.type) {
        default:
            return state;
    }
};
