import React from 'react';
import './SearchBar.css'

export class SearchBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            term: ""
        };

        this.search = this.search.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }
    
    search() {
        this.props.onSearch(this.state.term);
    }

    handleTermChange(e) {
        this.setState({term: e.target.value});
    }

    handleKeyDown(e) {
        if (e.charCode === 13) {
            this.handleTermChange()
        }
    }
    
    render() {
        return (
            <div className="SearchBar">
                <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange} 
                onKeyPress={this.handleKeyDown}
                /> 
                <button className="SearchButton" onClick={this.search} >SEARCH</button>
            </div> 
        )
    }
};