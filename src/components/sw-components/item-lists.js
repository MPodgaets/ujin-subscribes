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
//return (<Link to={`/subscribe/${id}`} >{name}</Link>);
const renderName = ({id, name}) => {
    return (<p>{name}</p>);
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

