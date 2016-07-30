// Copyright 2016 David Lavieri.  All rights reserved.
// Use of this source code is governed by a MIT License
// License that can be found in the LICENSE file.

// Check if the given path match the regular expression
const isActiveLink = (path, regex) => {
    return path.match(regex);
};

export {isActiveLink};
