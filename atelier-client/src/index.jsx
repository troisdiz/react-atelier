import ReactDOM from 'react-dom'
import React from 'react'

// for polyfills (promises for example)
import 'babel-polyfill';

import Application from './Application';
import HomeView from './views/HomeView';

import './adminlte/less/AdminLTE.less';
import './adminlte/less/skins/skin-black.less';
import './static-styles/static-styles.scss';

ReactDOM.render(<Application>
    <HomeView />
</Application>, document.getElementById('react-container'));
