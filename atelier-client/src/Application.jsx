import React from 'react';
import Menu from './common/Menu';
import AdminLteApp from './adminlte/adminlteApp';

export default class Application extends React.Component {

    componentDidMount() {
        AdminLteApp.initApplication();
    }

    render() {
        return <div>
            <Menu />
            <div id="content-wrapper" className="content-wrapper has-sidebar">
                <div className="container-fluid row">
                    {this.props.children}
                </div>
            </div>
            <footer className="main-footer">
                <strong>Copyright rien du tout</strong>
            </footer>
        </div>;
    }

}

