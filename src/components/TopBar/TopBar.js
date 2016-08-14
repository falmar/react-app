// Copyright 2016 David Lavieri.  All rights reserved.
// Use of this source code is governed by a MIT License
// License that can be found in the LICENSE file.

import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import Access from './Access';

import {isActiveLink, pixelToRem} from './../../utilities/misc';

const TopBar = (props) => {
    const topBarStyle = {
        border: 'solid thin rgba(10,10,10, 0.25)',
        borderTop: 'none',
        marginBottom: pixelToRem(15),
        backgroundColor: '#ffffff'
    }

    return (
        <div className='row'>
            <div className='column'>
                <div style={topBarStyle}>
                    <div className='row align-justify'>
                        <div className='column'>
                            <ul className='menu'>
                                {props.menu}
                            </ul>
                        </div>
                        <div className='shrink column'>
                            {props.access}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

// required props
TopBar.propTypes = {
    menu: PropTypes.node.isRequired,
    access: PropTypes.node.isRequired
}

class TopBarContainer extends Component {
    constructor(props) {
        super(props)

        // bind method
        this.getMenu = this.getMenu.bind(this);
    }

    // top left menu; left to right order
    getMenuArray() {
        return [
            {
                to: '/',
                regex: /^\/$/,
                text: 'Home'
            }, {
                to: '/tickets',
                regex: /^\/tickets/,
                text: 'Tickets'
            }, {
                to: '/settings',
                regex: /^\/settings/,
                text: 'Settings'
            }
        ]
    }

    // map the MenuArray into Router Links
    // menu that match the current path add class active
    // and change its style font weigth to bold
    getMenu(currentPath) {
        return this.getMenuArray().map((menu, index) => {
            const active = isActiveLink(currentPath, menu.regex);
            const style = active
                ? {
                    fontWeight: 'bold'
                }
                : null

            return (
                <li key={index} className={active
                    ? 'active'
                    : ''} style={style}>
                    <Link to={menu.to}>{menu.text}</Link>
                </li>
            )
        });
    }

    render() {
        const {props} = this;
        // Wrap Access Component
        const accessWrap = () => <Access currentPath={props.currentPath}/>

        return <TopBar menu={this.getMenu(props.currentPath)} access={accessWrap()}/>
    }
}

export default TopBarContainer;
