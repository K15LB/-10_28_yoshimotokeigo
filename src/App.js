import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import "semantic-ui-css/semantic.min.css";
import 'react-datepicker/dist/react-datepicker.css';
import Amplify, { Auth } from 'aws-amplify';

import aws_exports from './aws-exports';
import { withAuthenticator } from 'aws-amplify-react';

import './App.css';
import AllEvents from './Components/AllEvents';
import NewEvent from './Components/NewEvent';
import ViewEvent from './Components/ViewEvent';
Amplify.configure(aws_exports);

const Home = () => (
    <div className="ui container">
        <AllEvents />
    </div>
);

class App extends Component {
    render() {
        // console.log(this.props.authData.username);
        // console.log(Auth);
        return (
            <Router>
                <div>
                    <Route exact={true} path="/" component={Home} />
                    <Route path="/event/:id" component={ViewEvent} />
                    <Route path="/newEvent" component={NewEvent} />
                </div>
            </Router>
        )
    }
};



export default withAuthenticator(App, { includeGreetings: true });
