// Copyright 2016 David Lavieri.  All rights reserved.
// Use of this source code is governed by a MIT License
// License that can be found in the LICENSE file.

import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';

import * as sysMessagesActions from './../store/actions/system_message';

class Message extends Component {
    componentDidMount() {
        const node = ReactDOM.findDOMNode(this);

        setTimeout(() => {
            node.classList.remove('closed');
        });
    }

    render() {
        const {props} = this;
        let {count} = props.data;

        count = count > 1 ? `(${count})` : '';

        return (
            <div className={['callout' , 'sys-message', 'closed', props.data.type].join(' ')}>
                {props.data.humanMessage} {count}
                <button className='close-button' aria-label='Close alert' type='button' onClick={props.onClose}>
                    <span aria-hidden='true'>&times;</span>
                </button>
            </div>
        );
    }
}

// required props
Message.propTypes = {
    data: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired
};

const SystemMessages = (props) => {
    const messages = props.messages.map((message, index) => {
        return <Message key={index} data={message} onClose={props.onClose(message.code)} />
    });

    return (
        <div className='row'>
            <div className='small-12 column'>
                {messages}
            </div>
        </div>
    );
};

// required props
SystemMessages.propTypes = {
    messages: PropTypes.array.isRequired,
    onClose: PropTypes.func.isRequired
};

class SystemMessagesContainer extends Component {
    render() {
        const {props} = this;

        return <SystemMessages
            messages={props.messages}
            onClose={props.onClose}
            />
    }
}

SystemMessagesContainer.propsTypes = {
    messages: PropTypes.array.isRequired,
    onClose: PropTypes.func.isRequired
}

const mapStateToProps = ({sysMessages}) => {
    return {
        messages: sysMessages
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onClose: (code) => (event) => {
            event.currentTarget.parentElement.classList.add('closed');

            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(dispatch(
                        sysMessagesActions.deleteMessage(code)
                    ))
                }, 350);
            });
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SystemMessagesContainer);
