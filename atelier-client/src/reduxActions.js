import fetch from 'isomorphic-fetch';
import {actions} from './reduxReducer';

export function fetchData() {
    return (dispatch) => {
        fetch('/data')
            .then(response => response.json())
            .then(data => dispatch({
                type: actions.FetchData,
                data
            }))
    }
};
