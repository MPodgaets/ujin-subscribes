import React from "react";
import ItemList from '../item-list';
import { withData, withSwapiService } from '../hoc-helpers';
import {Link} from 'react-router-dom';

const withChildFunction = (Wrapped, fn) => {
    return (props) => {
        return (
            <Wrapped {...props}>
                {fn}
            </Wrapped>
        );
    };
};

const renderName = ({name}) => {
    return (<Link to="/subscribe/:id">{name}</Link>);
};

const mapMethodToProps = (swapiService) => {
    return {
        getData: swapiService.getPersonSubscribes
    }      
};
const SubscribeList = withSwapiService(
    withData(
        withChildFunction(
                ItemList, renderName
        )
    ),    
    mapMethodToProps    
);

export {
    SubscribeList
};

