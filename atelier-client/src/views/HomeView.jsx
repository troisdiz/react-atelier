import React from 'react';
import Hello from '../components/Hello';

export default class HomeView extends React.Component {

    componentDidMount() {
        console.log('HomeView componentDidMount')
    }

    componentDidUpdate() {
        console.log('HomeView componentDidUpdate')
    }

    render() {
        console.log('HomeView render')
        return <div className="view-container">
            <h2>Home</h2>
            <Hello message="hello from home"/>
        </div>;
    }
}