import React from 'react';

import LoginWindow from '../login-window';

const LoginPage = ({onTestLogin}) => {
    return (
        <LoginWindow onTestLogin={onTestLogin}/>
    );
};

export {LoginPage};