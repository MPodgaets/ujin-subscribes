import React from "react";
import './item-details.css';

const Record = ({dataRecord, field, label}) => {
    const {data} = dataRecord;
    return (
        <li className="list-group-item">
            <span className="term">{label}</span>
            <span>{String(data[field])}</span>
        </li>
    );
};

const BoolRecord = ({dataRecord, field, label, enabled}) => {
    const {data, onChangeRecord} = dataRecord;
    return (
        <li className="list-group-item-bool">
            <input type="checkbox" id="termBool" enabled={enabled}
                className="subscribeBool" checked={data[field]} 
                onChange={(e) => onChangeRecord(e)}/>
            <label htmlFor="termBool">{label}</label>
        </li>
    );
};
export {
    Record,
    BoolRecord
};
//
const ItemDetails = (props) => {
    const {data, blob, detailsChildren} = props;
    const {name} = data;
    return (
        <React.Fragment>
            <div className="card-body">
                <h4>
                    {name}
                </h4>
                <ul className="list-group-children">
                    {detailsChildren}
                </ul>
                <div>{blob}</div>
            </div>
        </React.Fragment>
    );
};

export default ItemDetails;