import React from 'react';

export default class Hello extends React.Component {

    constructor() {
        super();
        this.state = {message: 'hello again'}
    }

    render() {
        return <div>{this.state.message} <i className="fa fa-thumbs-up"/></div>;
    }

}