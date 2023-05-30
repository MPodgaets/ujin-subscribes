import React from "react";
import ItemDetails, {Record, BoolRecord} from "../item-details";
import { withDetailData, withSwapiService } from '../hoc-helpers';
import TestSwapiService from "../../services/test-swapi-service";

const mapMethodToProps = (swapiService) => {
    return {
        getData: swapiService.getDetailSubsrcibe,
        getBlob: swapiService.getSubscribeBlob,
        saveSubscribe: swapiService.saveSubscribe,
        paySubscribe: swapiService.payPersonSubscribe
    };
};

const SubscribeDetail = ({itemId, person}) => {
    const Subscribe = withSwapiService(
                        withDetailData(
                            ItemDetails, 
                            itemId
                        ), 
                        mapMethodToProps
                    );
    return (
        <Subscribe itemId={itemId} person={person}>
            <Record field="price" label="Цена"/>
            <BoolRecord field="on" label="Включено"/>
            <BoolRecord field="paid" label="Оплачено" enabled="false"/>
        </Subscribe>
        );  
};

export {
    SubscribeDetail
};