// Copyright 2016 David Lavieri.  All rights reserved.
// Use of this source code is governed by a MIT License
// License that can be found in the LICENSE file.

import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

// reducers
import tickets from './reducers/ticket';
import auth from './reducers/auth';
import sysMessages from './reducers/system_message';

// middleware
const middleware = applyMiddleware(thunk, logger());

const store = createStore(combineReducers({tickets, auth, sysMessages}), middleware);

export default store;

// window.store = store;
