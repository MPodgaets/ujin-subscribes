import React, {Component} from "react";
import ItemStatusFilter from '../item-status-filter';
import SearchPanel from '../search-panel';
import './item-list.css';

export default class ItemList extends Component { 

    state = {
        filter: 'all',
        term: ''
    };

    filter(items, filter) {
        switch (filter) {
          case 'all': return items;
          case 'on': return items.filter((item) => item.on);
          case 'unpaid': return items.filter((item) => !item.paid && item.on);
          default: return items;
        }
    };
    search(items, term) {
        if (term.length === 0) {
          return items;
        }
        return items.filter((item) => {
          return item.name.toLowerCase()
          .indexOf(term.toLowerCase()) > -1; 
        });
    };
    onSearchChange = (text) => {
        this.setState({
          term: text
        });
    };
    onFilterChange = (text) => {
        this.setState({
          filter: text
        });
    };

    render() {
        const {data, onItemSelected, children:renderLabel} = this.props;  
        const {term, filter} = this.state;
        const visibleItems = this.filter(this.search(data, term), filter); 
        const items = visibleItems.map((item) => {
            const label = renderLabel(item);
            const {id} = item;
            return (
                <li className="list-group-item"
                    key={id}
                    onClick={() => onItemSelected(id)}>
                    {label}
                </li>
            );
        });
        return (
            <div className="item-list">  
                <SearchPanel onSearchText={this.onSearchChange}/>
                <ItemStatusFilter filter={filter} 
                    onFilterChange={this.onFilterChange}/>
                <ol className="item-list list-group">
                    {items}
                </ol> 
            </div>
            
        );
    }        
};
