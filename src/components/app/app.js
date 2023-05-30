/* eslint-disable no-undef */
import React, {Component} from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import {SwapiServiceProvider} from '../swapi-service-context';
import ErrorBoundry from '../error-boundry';
import SwapiService from '../../services/test-swapi-service';

/* import {
    SubscribeDetail, 
    SubscribeList
} from '../sw-components'; */

import {
    SubscribeDetailPage, 
    SubscribeListPage,
    LoginPage
} from '../pages';

import './app.css';

export default class App extends Component {
    swapiService = new SwapiService();

    state = {
        person: null,
        idSubscribe: null,
        loading: false,
        error: false
    }

    onPersonLogin = (person) => {
        this.setState({
            person,
            loading: false,
            error: false
        });
    };

    onError = (err) => {
        this.setState({
            error: true,
            loading: false
        });
    };

    onTestLogin = (login, password) => {
         this.swapiService.getPersonByLoginPassword(login, password)
        .then(this.onPersonLogin)
        .catch(this.onError); 
        const {error} = this.state;
        return !error;
    }; 

    onItemSelected = (idSubscribe) => {
        this.setState({idSubscribe});
    };

    closeSubscribe = () => {
        this.setState({idSubscribe: null});
    };

    exitUser = () => {
        this.setState({person: null});
    };
    

    render() {
        const {person, idSubscribe} = this.state;

        return (  
            <ErrorBoundry>
                <SwapiServiceProvider value={this.swapiService} >
                    <Router>
                        <div className="subscribes-app">
                            <Routes>
                                <Route path="/" 
                                    element={<LoginPage onTestLogin={this.onTestLogin}/>}
                                    exact={true}
                                />
                                <Route path="/subscribes"
                                    element={<SubscribeListPage 
                                                person={person} 
                                                onItemSelected={this.onItemSelected}
                                                onExit={this.exitUser}/>}
                                />
                                <Route path="/subscribe/:id"
                                    element={<SubscribeDetailPage 
                                                itemId={idSubscribe} 
                                                person={person}
                                                onBack={this.closeSubscribe} 
                                                onExit={this.exitUser}/>} 
                                />
                            </Routes>
                        </div>
                    </Router>
                </SwapiServiceProvider>
            </ErrorBoundry> 
        );
    }
}