import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import List from './List.jsx';
import orderBy from 'lodash/orderBy';
import desc from './up-arrow.png';
import asc from './down-arrow.png';
import searchimg from './global.png';
const apiUrl = 'https://swapi.co/api/planets/';
const searchUrl = 'https://swapi.co/api/planets/?search=';
var nameimg = asc;
var popimg = asc;
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      planets: [],
      search: '',
      rCount:0,
      sortDirection:'asc',
      popDir:'',
      nameDir:'',
      sortValue:'url',
    }

    this.getPlanets = this.getPlanets.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

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

  showSearch() {
    this.setState({rCount: 0});
    this.setState({planets: []})
    axios.get(`${searchUrl}${this.state.search}`)
    .then((response) => {
      this.setState({rCount: response.data.count});
      console.log(response.data.count)
      this.setState( {planets: response.data.results})
    })

    var pscount = 10;
    var page = 2;
    while (pscount < this.state.rCount) {
      console.log(this.state.rCount)
      console.log('hiiii')
      axios.get(`${searchUrl}${this.state.search}&page=${page}`)
      .then((response) => {
        this.setState({rCount: response.data.next});
        console.log(response.data.next)
        var newItems = this.state.planets.concat(response.data.results);
        this.setState( {planets: newItems})
      })
      pscount += 10;
      page++;
    }
  }

  handleChange(event) {
    this.setState({search: event.target.value})
  }

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
