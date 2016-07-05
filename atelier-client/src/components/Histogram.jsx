import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './Histogram.scss';

const columnWidth = 20;
const higherColumnHeight = 200;

@CSSModules(styles)
export default class Histogram extends React.Component {

    // commented because of test =x
    // static propTypes = {
    //     data: React.PropTypes.arrayOf(React.PropTypes.string)
    // }

    render() {
        let max = Math.max(...this.props.data);
        return <svg width={1000} height={400}>
            {this.props.data.map((d, index) =>
                <g transform={`translate(${index * columnWidth + 20}, ${higherColumnHeight})`} key={index}
                   styleName="column-group">
                    <g transform="rotate(180)">
                        <rect x={0} y={0}
                              width={columnWidth}
                              height={d / max * higherColumnHeight}
                              styleName="column"/>
                    </g>
                    <text x={0} y={20} transform="rotate(45)" styleName="value">{d}</text>
                </g>
            )}
        </svg>
    }
}
