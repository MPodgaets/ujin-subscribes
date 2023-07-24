import React from 'react';
import {SubscribeList} from '../sw-components';
import {Link, useNavigate} from 'react-router-dom';
import './subscribe-list-page.css';

const SubscribeListPage = ({person, onExit, filter, onFilterChange}) => {
    const titleSubscribes = "Подписки пользователя: " +
        person.lastname + " " + person.firstname + " " + person.lastname; 
    const navigate = useNavigate();
    return (
        <div className="subscribe-list-page">
            <h2>
             {titleSubscribes}   
            </h2>
            <SubscribeList 
                person={person} 
                filter={filter}
                onFilterChange={onFilterChange}
                onItemSelected={(itemId) => {
                    navigate(`/subscribe/${itemId}`);
                }}
            />
            <button className="btn-link-login">
                <Link to="/" onClick={onExit}>Выход</Link>
            </button> 
        </div>
    );
};

export {SubscribeListPage};