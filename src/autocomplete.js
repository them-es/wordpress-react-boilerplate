import React, { Component } from 'react';
import { wp } from './wpAPI';

import Autocomplete from './autocompleteResult';


class Search extends Component {
  state = {
    query: '',
    results: [],
  }

  getResult = () => {
    // Fetch pages with search value "xyz": http://wp-api.org/node-wpapi/using-the-client/#api-query-parameters
    wp.pages().search( this.state.query )
      .then(posts => {
        this.setState({
          isLoading: false,
          results: posts // Get first element from array
        })
      })
      .catch(error => {
        this.setState({
          error,
          isLoading: false
        })
      });
  }

  handleInputChange = () => {
    this.setState({
      query: this.search.value
    }, () => {
      if (this.state.query && this.state.query.length > 1) {
        this.getResult();
        this.search.setAttribute("aria-expanded", "true");
      } else {
        this.setState({
          results: []
        });
        this.search.setAttribute("aria-expanded", "false");
      }
    })
  }

  handleInputFocus = () => {
    document.getElementById("autocomplete-result").style.display = "block";
  }

  handleInputBlur = () => {
    document.getElementById("autocomplete-result").style.display = "none";
  }

  render() {
    return (
      <form>
        <input
          className="form-control"
          placeholder="Search for..."
          ref={input => this.search = input}
          onChange={this.handleInputChange}
          onFocus={this.handleInputFocus}
          onBlur={this.handleInputBlur}
          role="combobox"
          aria-owns="autocomplete-result"
          aria-autocomplete="list"
          aria-expanded="false"
        />
        <Autocomplete results={this.state.results} />
      </form>
    )
  }
}

export default Search;