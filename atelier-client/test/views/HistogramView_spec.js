import React from 'react'
import TestUtils from 'react-addons-test-utils'
import {expect} from 'chai'
import $ from 'jquery'
import ReactDOM from 'react-dom'
import {HistogramView} from '../../src/views/HistogramView'

const {
    renderIntoDocument,
    Simulate
} = TestUtils;

describe('QuotableDataset', () => {
    it('handles click', () => {
        let fetchCalled = false;
        let data = {
            histogram: []
        };
        let fetchData = () => {
            fetchCalled = true;
        };
        let component = renderIntoDocument(<HistogramView fetchData={fetchData} data={data}/>);
        const element = ReactDOM.findDOMNode(component);
        const fetchDataButton = $(element).find('button:contains("get data")')[0];

        Simulate.click(fetchDataButton);

        expect(fetchCalled).to.equal(true);
    });

});
