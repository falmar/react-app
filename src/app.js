// Copyright 2016 David Lavieri.  All rights reserved.
// Use of this source code is governed by a MIT License
// License that can be found in the LICENSE file.

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router, Route, browserHistory} from 'react-router';

import Main from './layout/Main';
import Home from './pages/Home';

import store from './store/store';

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route component={Main}>
                <Route path='/' component={Home} />
                <Route path='/tickets' component={Home} />
                <Route path='/settings' component={Home} />
                <Route path='/login' component={Home} />
            </Route>
        </Router>
    </Provider>,
    document.getElementById('app')
);
