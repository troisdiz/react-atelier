import {Map, List, fromJS} from 'immutable';

export const actions = {
    FetchData: 'FetchData'
};

let startState = Map({
    data: Map({
        histogram: List()
    })
});

export default function (state = startState, action) {
    return state;
}
