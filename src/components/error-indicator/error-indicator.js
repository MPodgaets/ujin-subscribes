import React from "react";
import './error-indicator.css';
import icon from './death-star.png';

const ErrorIndicator = () => {
    return (
        <div className="error-indicator">
            <img src={icon} alt="error icon"/>
            <span className="boom">BOOM!</span>
            <span>Что-то пошло не так</span>
            <span>Попробуйте зайти заново</span>
        </div>
    );
}

export default ErrorIndicator;