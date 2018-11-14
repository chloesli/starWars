import React, { Component } from 'react';
/*import TerrainInfo from './TerrainInfo.jsx';*/
class List extends Component {
  render() {
    const planets = this.props.planets;

    return (
      <div className="">
      {
        planets.map((p) => {
          console.log(p)
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
