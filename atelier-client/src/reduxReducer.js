import {Map, List, fromJS} from 'immutable';

export const actions = {
    FetchData: 'FetchData'
};

let startState = Map({
    data: Map({
        histogram: List()
    })
});

let setData = (state, data) => state.setIn(['data', 'histogram'], fromJS(data));

export default function (state = startState, action) {
    switch (action.type) {
        case actions.FetchData:
            return setData(state, action.data);
    }
    return state;
}
