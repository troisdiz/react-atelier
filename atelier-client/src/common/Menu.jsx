import React from 'react';
import {Link} from 'react-router';
import styles from './Menu.scss';
import {i18n} from '../i18n';

import CSSModules from 'react-css-modules';

@CSSModules(styles)
export default class Menu extends React.Component {

    render() {
        return <aside className="main-sidebar" styleName="menu">
            <section className="sidebar">
                <div styleName="title-bloc">
                    <Link to={'/'} styleName="title">
                        <span>{i18n('Menu.ApplicationTitle')}</span>
                    </Link>
                    <ul className="sidebar-menu">
                        <li>
                            <Link to={'/home'} styleName="home-link" activeClassName={styles.active}>
                                <i className="fa fa-home"></i> {i18n('Menu.Home')}
                                <i className="fa fa-angle-right" styleName="arrow"></i>
                            </Link>
                        </li>
                    </ul>
                </div>
                <ul className="sidebar-menu">
                    <li>
                        <Link to={'/histogram'} activeClassName={styles.active}>
                            <i className="fa fa-bar-chart icon-lg"></i> <span>{i18n('Menu.Histo')}</span>
                            <i className="fa fa-angle-right" styleName="arrow"></i>
                        </Link>
                    </li>
                </ul>
            </section>
        </aside>
    }
}
