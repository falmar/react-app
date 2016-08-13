// Copyright 2016 David Lavieri.  All rights reserved.
// Use of this source code is governed by a MIT License
// License that can be found in the LICENSE file.

import axios from 'axios';

export const setAuthHeader = token => {
    window.localStorage.setItem('token', token);
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
}

export const removeAuthHeader = () => {
    window.localStorage.removeItem('token');
    axios.defaults.headers.common.Authorization = null;
}
