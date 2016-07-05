import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './HistogramView.scss';
import Histogram from '../components/Histogram';
import {i18n} from '../i18n';

@CSSModules(styles)
export default class HistogramView extends React.Component {

    constructor() {
        super();
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        // TODO fetch data
    }

    render() {
        return <div className="view-container">
            <h2>{i18n('HistogramView.Title')}</h2>
            <div styleName="histogram-container">
                <button onClick={this.fetchData.bind(this)}>get data</button>
                <Histogram data={this.state.data}/>
            </div>
        </div>;
    }
}