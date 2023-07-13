import React, {Component} from 'react';
import './item-status-filter.css';

export default class ItemStatusFilter extends Component {

  buttons = [
    {name: 'all', label: 'Все'},
    {name: 'on', label: 'Включено'},
    {name: 'unpaid', label: 'Включено, но не оплачено'}
  ];

  render() {
    const {filter, onFilterChange} = this.props;

    const buttons = this.buttons.map(({name, label}) => {
    const isActive = filter === name;
    const classButton = isActive ? 'btn-info' : 'btn-outline-secondary';
    //{`btn ${classButton}`}
    return (
        <button type="button"
            className={classButton}
            key={name}
            onClick={() => onFilterChange(name)}>
          {label}
        </button>
      );
    });
    return (
      <div className="btn-group">
        {buttons}
      </div>);
  };
}
