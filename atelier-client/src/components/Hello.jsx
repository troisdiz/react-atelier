import React from 'react';

module.exports = React.createClass({

    displayName: 'Hello',

    getInitialState() {
        return {}
    },

    render() {
        return <div>{this.state.message} <i className="fa fa-thumbs-up"/></div>;
    }

});