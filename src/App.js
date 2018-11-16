import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import orderBy from 'lodash/orderBy';
import List from './List.jsx';
/* Images */
import desc from './up-arrow.png';
import asc from './down-arrow.png';
import searchimg from './global.png';

/* variables and constants */
const apiUrl = 'https://swapi.co/api/planets/';
const searchUrl = 'https://swapi.co/api/planets/?search=';
/* Variable for displaying and changing the arrow images*/
var nameimg = asc;
var popimg = asc;

class App extends Component {
  /* Declaring state variables
  planets - an array of planets that gets rendered
  search - holds search term in the search bar
  sortDirection, popDir, nameDir, sortValue - used to hold sorting directions to allow toggling
  Default sortDirection and sortValue is ascending order by url
  */
  constructor(props) {
    super(props);
    this.state = {
      planets: [],
      search: '',
      sortDirection:'asc',
      popDir:'',
      nameDir:'',
      sortValue:'url',
    }

    this.getPlanets = this.getPlanets.bind(this);
    /* search bar handlers*/
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /* Function that displays all the planets initially - Displays all 7 pages of search results
     Appends the
  */
  getPlanets() {
    this.setState({planets: []})
    var page = 1;
    while (page < 8) {
      axios.get(`${apiUrl}?page=${page}`)
      .then((response) => {
        console.log(response.data.results);
        var newItems = this.state.planets.concat(response.data.results);
        this.setState( {planets: newItems})
      })
      page++;
    }
  }

  componentDidMount() {
    this.getPlanets()
  }

  /* Helps toggle Sorting by name*/
  handleSortName() {
    this.setState({sortValue:'name'})
    if (this.state.nameDir === 'asc') {
      this.setState({sortDirection:'desc'})
      this.setState({nameDir:'desc'})
      nameimg = asc;
    } else {
      this.setState({sortDirection:'asc'})
      this.setState({nameDir:'asc'})
      nameimg = desc;
    }
  }

  /* Helps toggle Sorting by population*/
  handleSortPop(){
    this.setState({sortValue:'population'})
    if (this.state.popDir === 'asc') {
      this.setState({sortDirection:'desc'})
      this.setState({popDir:'desc'})
      popimg = asc;
    } else {
      this.setState({sortDirection:'asc'})
      this.setState({popDir:'asc'})
      popimg = desc;
    }
  }

  /* Shows top 10 results */
  showSearch() {
    this.setState({planets: []})
    axios.get(`${searchUrl}${this.state.search}`)
    .then((response) => {
      console.log('search registered')
      console.log(response.data.results)
      this.setState( {planets: response.data.results})
    })
  }

  /* Changes the state of search*/
  handleChange(event) {
    this.setState({search: event.target.value})
  }
  /*Shows search results*/
  handleSubmit(event) {
    event.preventDefault();
    this.showSearch();
  }

  render() {
    const {planets} = this.state;
    return (
      <div className="App">
         <div className="planet-search">Enter a planet name:
          <form onSubmit={this.handleSubmit}>
          <div className="search-field">
            <input type="text" value={this.state.search} onChange={this.handleChange}/>
             <button type="submit" alt="submit"> <img src={searchimg} alt="search" title="Search"/> </button>
          </div>
          </form>
         </div>

         <div className="planets-name-h"><button onClick={() => this.handleSortName()}>Name <img src={nameimg} alt="sort"/> </button></div>
         <div className="planets-pop-h"><button onClick={() => this.handleSortPop()}>Population <img src={popimg} alt="sort"/> </button></div>
         <div className="planets-terrain-h"> Terrain</div>

         <List planets={orderBy(planets, this.state.sortValue, this.state.sortDirection)} />

      </div>

    );
  }
}
export default App;
