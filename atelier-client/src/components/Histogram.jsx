import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './Histogram.scss';

const columnWidth = 20;
const higherColumnHeight = 200;

@CSSModules(styles)
export default class Histogram extends React.Component {

    render() {
        let max = Math.max(...this.props.data);
        return <svg width={1000} height={400}>
        </svg>
    }
}