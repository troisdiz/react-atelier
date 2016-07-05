import React from 'react';

export default class Hello extends React.Component {

    componentDidMount() {
        console.log('Hello componentDidMount')
    }

    componentDidUpdate() {
        console.log('Hello componentDidUpdate')
    }

    render() {
        console.log('Hello render')
        return <div>{this.props.message} <i className="fa fa-thumbs-up"/></div>;
    }

}