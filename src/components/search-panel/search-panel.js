import React, {Component} from 'react';
import './search-panel.css';
//flex-grow: 1;
export default class SearchPanel extends Component {
    state = {
        term: ''
    };

    onChangeText = (e) => {
        const term = e.target.value;
        this.setState({term});
        this.props.onSearchText(term);
    }; 

    render() {
        return (
            <div className="search-panel">
                <input type="text"
                    className="search-input"
                    placeholder="поиск по названию" 
                    value = {this.state.term} 
                    onChange={this.onChangeText}/>
            </div>
        );
    };
  }