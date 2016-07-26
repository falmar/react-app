// Copyright 2016 David Lavieri.  All rights reserved.
// Use of this source code is governed by a MIT License
// License that can be found in the LICENSE file.

import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

// reducers
import tickets from './reducers/ticket';

// middleware
const middleware = applyMiddleware(thunk, logger());

export default createStore(combineReducers({
    tickets
}), middleware);