// Copyright 2016 David Lavieri.  All rights reserved.
// Use of this source code is governed by a MIT License
// License that can be found in the LICENSE file.

// when fetching data from server this comes handy
// to store the data, check last fetched time and if
// it is currently fetching
const fetchable = {
    isFetching: false,
    data: [],
    fetchedAt: null
};

export {fetchable};
