import ReactDOM from 'react-dom'
import React from 'react'
import {Provider} from 'react-redux'
import {Router, Route, browserHistory, IndexRedirect} from 'react-router'
import thunkMiddleware from 'redux-thunk'
import {compose, createStore, applyMiddleware} from 'redux'

// for polyfills (promises for example)
import 'babel-polyfill';

import ApplicationContainer from './Application';
import HomeView from './views/HomeView';
import HistogramView from './views/HistogramView';

import './adminlte/less/AdminLTE.less';
import './adminlte/less/skins/skin-black.less';
import './static-styles/static-styles.scss';

// const store = createStore(reducer, compose(
//     applyMiddleware(
//         thunkMiddleware
//     ),
//     window.devToolsExtension ? window.devToolsExtension() : f => f
// ));

//<Provider store={store}>
ReactDOM.render(<Router history={browserHistory}>
    <Route path="/" component={ApplicationContainer}>
        <IndexRedirect to="/home"/>
        <Route path="/home" component={HomeView}/>
        <Route path="/histogram" component={HistogramView}/>
    </Route>
</Router>, document.getElementById('react-container'));
