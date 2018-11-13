import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import List from './List.jsx';
import orderBy from 'lodash/orderBy';

const apiUrl = 'https://swapi.co/api/planets/';
const searchUrl = 'https://swapi.co/api/planets/?search=';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      planets: [],
      search: '',
      next:null,
      sortDirection:'',
      popDir:'',
      nameDir:'',
      sortValue:'',
    }

    this.getPlanets = this.getPlanets.bind(this);
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
    } else {
      this.setState({sortDirection:'asc'})
      this.setState({nameDir:'asc'})
    }
    /*console.log('sort name')
    this.setState({
      planets: [
        {"name":"Chloe", "terrain":"dry", "population": "really popular"},
        {"name":"John", "terrain":"cool", "population": "really popular x100"},
      ]
    })*/

  }

  handleSortPop(){
    this.setState({sortValue:'population'})
    if (this.state.popDir === 'asc') {
      this.setState({sortDirection:'desc'})
      this.setState({popDir:'desc'})
    } else {
      this.setState({sortDirection:'asc'})
      this.setState({popDir:'asc'})
    }
  }

  updateSearch(event) {
    console.log(event.target.value);
    this.setState({search: event.target.value})

      this.getSearch()

  }

  getSearch() {
    this.setState({planets: []})
    axios.get(`${searchUrl}${this.state.search}`)
    .then((response) => {
      this.setState( {planets: response.data.results})
    })
  }
  render() {

    const {planets} = this.state;
    return (
      <div className="App">
         <div className="planet-search"> Search: <input type="text" value={this.state.search} onChange={this.updateSearch.bind(this)}/></div>
         <div className="planets-name-h">Name <button onClick={() => this.handleSortName()}> sort </button></div>
         <div className="planets-pop-h">Population <button onClick={() => this.handleSortPop()}> sort </button></div>
         <div className="planets-terrain-h"> Terrain</div>
        <ol> <List planets={orderBy(planets, this.state.sortValue, this.state.sortDirection)} /> </ol>

      </div>

    );
  }
}

export default App;
