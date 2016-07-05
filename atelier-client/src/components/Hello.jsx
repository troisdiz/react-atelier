import React from 'react';

export default class HelloClass extends React.Component {

    constructor() {
        super();
        this.state = {
            message: 'Hello component'
        }
    }

    componentDidMount() {
        // call the back-end
    }

    render() {
        return <div>{this.state.message} <i className="fa fa-thumbs-up"/></div>;
    }

}