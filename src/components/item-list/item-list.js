import React, {Component} from "react";
import ItemStatusFilter from '../item-status-filter';
import SearchPanel from '../search-panel';
import './item-list.css';

export default class ItemList extends Component { 

    state = {
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

    render() {
        const {data, filter, children:renderLabel, onFilterChange, onItemSelected} = this.props;  
        const {term} = this.state;

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
                    onFilterChange={onFilterChange}/>
                <ol className="item-list list-group">
                    {items}
                </ol> 
            </div>
            
        );
    }        
};
