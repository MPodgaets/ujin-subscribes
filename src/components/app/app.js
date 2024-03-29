/* eslint-disable no-undef */
import React, {Component} from "react";
import {BrowserRouter as Router, Route, Routes, useParams} from 'react-router-dom';

import {SwapiServiceProvider} from '../swapi-service-context';
import ErrorBoundry from '../error-boundry';
import SwapiService from '../../services/test-swapi-service';


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
        loading: false,
        error: false,
        filter: 'all'
    }

    onFilterChange = (text) => {
        this.setState({
          filter: text
        });
    };

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

    exitUser = () => {
        this.setState({person: null});
    };
    

    render() {
        const {person, filter} = this.state;

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
                                                onExit={this.exitUser}
                                                filter={filter} 
                                                onFilterChange={this.onFilterChange}/>}
                                />
                                <Route path="/subscribe/:id"
                                    element={
                                            <MatchPath 
                                            person={person} 
                                            onExit={this.exitUser}/>}
                                />
                            </Routes>
                        </div>
                    </Router>
                </SwapiServiceProvider>
            </ErrorBoundry> 
        );
    }
};

function MatchPath({person, onBack, onExit}) {
    const {id} = useParams(); 
    return <SubscribeDetailPage itemId={id}
                    person={person}
                    onExit={onExit}/>;
};