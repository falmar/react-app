// Copyright 2016 David Lavieri.  All rights reserved.
// Use of this source code is governed by a MIT License
// License that can be found in the LICENSE file.

import React, {PropTypes} from 'react';
import TopBar from './../components/TopBar/TopBar';
import SystemMessages from './../components/SystemMessages';

const Main = (props) => {
    return (
        <div>
            <TopBar currentPath={props.location.pathname} />
            <SystemMessages />
            {props.children}
        </div>
    );
};

// required props
Main.propTypes = {
    children: PropTypes.node.isRequired,
    location: PropTypes.object.isRequired
};

export default Main
