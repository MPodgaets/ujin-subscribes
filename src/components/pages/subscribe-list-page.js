import React from 'react';
import {SubscribeList} from '../sw-components';
import {Link} from 'react-router-dom';
import './subscribe-list-page.css';

//<SubscribeList person={person} onItemSelected={this.onItemSelected}/>

const SubscribeListPage = ({person, onItemSelected, onExit}) => {
    const titleSubscribes = "Подписки пользователя: " +
        person.lastname + " " + person.firstname + " " + person.lastname; 
    return (
        <div className="subscribe-list-page">
            <h2>
             {titleSubscribes}   
            </h2>
            <SubscribeList person={person} onItemSelected={onItemSelected}/>
            <button className="btn-link-login">
                <Link to="/" onClick={onExit}>Выход</Link>
            </button>
            
        </div>
    );
};

export {SubscribeListPage};