import React, {Component} from 'react';
//import {Link} from 'react-router-dom';
import { Navigate } from "react-router-dom";

import './login-window.css';

export default class LoginWindow extends Component {
    state = {
        login: '',
        password: '',
        verified: false
    };

    onChangeLogin = (e) => {
        const login = e.target.value;
        this.setState({login});
    };
    
    onChangePassword = (e) => {
        const password = e.target.value;
        this.setState({password});
    };

    onTestLoginPassword = () => { 
        const {login, password} = this.state; 
    };

    static defaultProps = {
        onTestLogin: () => {}
    }

    onTestClick = (e) => {
        const {onTestLogin} = this.props;
        const {login, password} = this.state;
        const result = onTestLogin(login, password);
        this.setState({verified: result}); 
    };

    render() {
        const {verified} = this.state;
        const subscribes = verified ? (<Navigate to="/subscribes" replace={true} />) : null;
        return (
            <div className="login">
                {subscribes}
                <h2>
                    Ujin подписки
                </h2>
                <h4>
                    Для просмотра Ваших подписок введите имя и пароль
                </h4>
                <label htmlFor="termLogin" 
                    className="user-label">
                    Имя
                </label>
                <input type="text"
                    className="user-input"
                    id="termLogin"
                    placeholder="введите имя" 
                    value = {this.state.login} 
                    onChange={this.onChangeLogin}/>
                <p></p>
                <p></p>
                <label htmlFor="termPassword" 
                        className="password-label">
                    Пароль
                </label>
                <input type="text"
                    className="password-input"
                    id="termPassword"
                    placeholder="введите пароль" 
                    value = {this.state.password} 
                    onChange={this.onChangePassword}/>
                <p></p>
                <p></p>
                <button className="btn-test"
                    onClick={(e) => this.onTestClick(e)}>
                    Вход
                </button>
            </div>
    );
    }
    
};

//