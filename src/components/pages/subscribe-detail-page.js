import React from 'react';
import {SubscribeDetail} from '../sw-components';
import {Link} from 'react-router-dom';
import './subscribe-detail-page.css';

const SubscribeDetailPage = ({itemId, person, onExit}) => {
    return (
        <div className='subscribe-detail-page'>
            <SubscribeDetail itemId={itemId} person={person}/>
            
            <button className="btn-link-subscribes">
                <Link to="/subscribes/">Назад к списку</Link>
            </button>
            <button className="btn-link-login">
                <Link to="/" onClick={onExit}>Выход</Link>
            </button>
        </div>
    );  
};

export {SubscribeDetailPage};