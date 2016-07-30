// Copyright 2016 David Lavieri.  All rights reserved.
// Use of this source code is governed by a MIT License
// License that can be found in the LICENSE file.

import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import Access from './Access';

import {isActiveLink} from './../../utilities/misc';

const TopBar = (props) => {
    const topBarStyle = {
        border: 'solid thin #ccc',
        borderTop: 'none'
    }

    return (
        <div className='row'>
            <div className='column' style={topBarStyle}>
                <div className='row align-justify' >
                    <div className='column'>
                        <ul className='menu' >
                            {props.menu}
                        </ul>
                    </div>
                    <div className='shrink column'>
                        {props.access}
                    </div>
                </div>
            </div>
        </div>

    );
}

TopBar.propTypes = {
    menu: PropTypes.node.isRequired,
    access: PropTypes.node.isRequired
}

class TopBarContainer extends Component {
    constructor(props) {
        super(props)

        this.getMenu = this.getMenu.bind(this);
    }

    getMenuArray() {
        return [{
            to: '/',
            regex: /^\/$/,
            text: 'Home'
        },{
            to: '/tickets',
            regex: /^\/tickets/,
            text: 'Tickets'
        },{
            to: '/settings',
            regex: /^\/settings/,
            text: 'Settings'
        }]
    }

    getMenu(currentPath) {
        return this.getMenuArray().map((menu, index) => {
            const active = isActiveLink(currentPath, menu.regex);
            const style = active ? {fontWeight: 'bold'} : null

            return (
                <li key={index} className={active ? 'active' : ''} style={style}>
                    <Link to={menu.to}>{menu.text}</Link>
                </li>
            )
        });
    }

    render() {
        const {props} = this;
        const accessWrap = () => {
            return (
                <Access currentPath={props.currentPath} />
            )
        }

        return (
            <TopBar
                menu={this.getMenu(props.currentPath)}
                access={accessWrap()}
                />
        )
    }
}

export default TopBarContainer;
