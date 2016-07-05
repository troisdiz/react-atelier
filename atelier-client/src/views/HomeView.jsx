import React from 'react';
import Hello from '../components/Hello';

export default class HomeView extends React.Component {

    render() {
        return <div className="view-container">
            <h2>Home</h2>
            <Hello />
        </div>;
    }
}