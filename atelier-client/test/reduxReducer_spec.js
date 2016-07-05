import {Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reduxReducer';
import {actions as reduxActions} from "../src/reduxReducer";

describe('reducer', () => {

    it('handles FetchData', () => {
        const initialState = Map();
        const action = {
            type: reduxActions.FetchData,
            data: ['1', '2']
        };

        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            data: {
                histogram: ['1', '2']
            }
        }));
    });

});
