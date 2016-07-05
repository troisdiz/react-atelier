import React from 'react';

module.exports = React.createClass({

    displayName: 'Hello',

    getInitialState() {
        return {
            message: 'Hello component'
        }
    },

    componentDidMount() {
        // call the back-end
    },

    render() {
        return <div>{this.state.message} <i className="fa fa-thumbs-up"/></div>;
    }

});