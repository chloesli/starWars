import React, { Component } from 'react';

class List extends Component {
  render() {
    const planets = this.props.planets;
    /* Renders each row of planets in the planets array*/
    return (
      <div className="">
      {
        planets.map((p) => {
          return (
            <div key={p.url} className="planets-wrap">
               <div className="planets-name">{p.name} </div>
               <div className="planets-pop"> {p.population} </div>
               <div className="planets-terrain"> {p.terrain}</div>
            </div>

          )
        })
      }
      </div>
    );
  }
}

export default List;
