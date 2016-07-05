import React from 'react';

export default class Hello extends React.Component {

    render() {
        return <div>{this.props.message} <i className="fa fa-thumbs-up"/></div>;
    }

}