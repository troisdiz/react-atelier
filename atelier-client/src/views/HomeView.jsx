import React from 'react';
import Hello from '../components/Hello';

export default class HomeView extends React.Component {

    constructor() {
        super();
        this.state = {
           message: 'hello from home'
        };
    }

    componentDidMount() {
        console.log('HomeView componentDidMount')
    }

    componentDidUpdate() {
        console.log('HomeView componentDidUpdate')
    }

    changeMessage() {
        this.setState({
            message: 'nouveau message'
        });
    }

    render() {
        console.log('HomeView render')
        return <div className="view-container">
            <h2>Home</h2>
            <Hello message={this.state.message}/>
            <br />
            <button onClick={this.changeMessage}>Change message</button>
        </div>;
    }
}