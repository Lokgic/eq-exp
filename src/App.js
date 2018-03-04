import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Chains from './chains.json'
import Bar from './components/Bar'
import DropdownMenu from './components/DropdownMenu'
import {scaleLinear} from 'd3-scale'
import styled from 'styled-components';

const sdOptions = [
  {value:0.025},{value:0.05},{value:0.1}
]

const muOptions = [
{value:0.2},{value:0.3},{value:0.4},{value:0.5},{value:0.6},{value:0.7},{value:0.8}
]


const Tick = styled.line`
  stroke:black;
  stroke-width:1;
  stroke-dasharray:5, 5;
  opacity: 0.8;
`


class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      dynamic:true,
      error:true,
      sd:0.1,
      mu:0.5,
    }
    this.getCol = this.getCol.bind(this)
    this.handleDropdown = this.handleDropdown.bind(this)

  }
  handleDropdown(event){

    this.setState({
      [event.target.id]:event.target.value
    })
  }
  getCol({mu,sd}){
    let m2,sd2
    switch(parseFloat(sd)){
      case 0.025:
        sd2 = 0
        break;
      case 0.05:
        sd2 = 1;
        break;
      case 0.1:
        sd2 = 2;
        break;
      default:
        sd2 = 1;

      }
    switch(parseFloat(mu)){
      case 0.2:
        m2 = 0
        break;
      case 0.3:
        m2 = 1;
        break;
      case 0.4:
        m2 = 2;
        break;
      case 0.5:
        m2 = 3;
        break;
      case 0.6:
        m2 = 4;
        break;
      case 0.7:
        m2 = 5;
        break;
      case 0.8:
        m2 = 6;
        break;
      default:
        m2 = 2;

      }
      const key = Object.keys(Chains)[m2*3+sd2]
      return Chains[key]
  }

  render() {
    const {sd,mu,dynamic,error} = this.state
    const chains = this.getCol({sd,mu})
    const margin = {y:30,x:150}
    const dim = {h:450,w:80}
    const tickScale = scaleLinear()
            .domain([0,10])
            .range([dim.h+margin.y, margin.y]);
    return (
      <div className="App">
        <svg width = {800} height = {600}>
                <Bar
                h={dim.h}
                w={dim.w}
                color="RoyalBlue"
                x={margin.x}
                y={margin.y}
                label="test"
                sd={sd}
                chain={chains}
                mu={mu}
                dynamic={dynamic}
                error={error}
                t={150}
              />
          <g>
            {
              [...Array(11).keys()].map(d=>(
                <g>
                  <Tick
                    x1={margin.x-35}
                    x2={margin.x+dim.w}
                    y1={tickScale(d)}
                    y2={tickScale(d)}
                  />
                  <text
                    x={margin.x-35}
                    y={tickScale(d)}
                    fontSize={10}
                    >
                    {d*10+"%"}
                  </text>
                </g>
                ))
            }

          </g>
        </svg>
        <form>
          <label>
            SD
          </label>
          <select
            value={sd}
            onChange={this.handleDropdown}
            id="sd"
            >
            {sdOptions.map(({value,text})=>(
              <option
                value={value}
                >
                {text?text:value}
              </option>
            ))}
          </select>
          <label>mean</label>
          <select
            value={mu}
            onChange={this.handleDropdown}
            id="mu"
            >
            {muOptions.map(({value,text})=>(
              <option
                value={value}
                >
                {text?text:value}
              </option>
            ))}
          </select>
        </form>

          {/* <DropdownMenu
            on
            selected={sd}
            options={sdOptions}
            title="sigma"
          /> */}


      </div>
    );
  }
}

export default App;
