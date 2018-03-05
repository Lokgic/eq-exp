import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Chains from './chains.json'
import Bar from './components/Bar'
// import DropdownMenu from './components/DropdownMenu'
import styled from 'styled-components';
import Axis from './components/Axis'
import {random,sample} from 'lodash'
import Settings from './components/Settings'
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Typography from 'material-ui/Typography';

const options = {
  sd:[
    0.025,0.05,0.1
  ],
  mu:[
  0.2,0.3,0.4,0.5,0.6,0.7,0.8
  ]

}

const Button = styled.rect`
  fill:LightSteelBlue;
  stroke:grey;
  stroke-width:3;
  cursor:pointer;
  &:hover{
    stroke:black;
    fill:navy;
  }
  rx:5;
  ry:5;
`

class App extends Component {
  constructor(props){
    super(props)

    this.nextMode = this.nextMode.bind(this);
    this.getCol = this.getCol.bind(this);
    this.handleDropdown = this.handleDropdown.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.randomNewParm = this.randomNewParm.bind(this);
    this.handleSettings = this.handleSettings.bind(this)

    this.state = {
      dynamic:false,
      error:false,
      mode:0,
      ...this.randomNewParm()
    }

  }
  handleNext(){

    let next = this.nextMode();
    // if (next.mode===0) next = {
    //   ...next,
    //   ...this.randomNewParm()
    // }
    this.setState(next);
  }
  handleDropdown(event){
    const val = event.target.id.split("_")
    const parmType = val[0]
    const dist = {0:"left",1:"right"}[val[1]]
    this.setState({
      [dist]:{...this.state[dist],[parmType]:event.target.value}
    })
  }
  handleSettings(props){
    const {dist,p,direction} = props
    const currentIndex = options[p].indexOf(this.state[dist][p]);
    const nextIndex = direction==="plus"? Math.min(options[p].length-1,currentIndex+1):Math.max(0,currentIndex-1);
    let newS = {
      [dist]:{
        ...this.state[dist],
        [p]:options[p][nextIndex]
      }
    }
    newS[dist].chain = this.getCol({sd:newS[dist].sd,mu:newS[dist].mu})

    this.setState(newS)
  }
  randomNewParm(){

    let left =     {sd:sample(options.sd),mu:sample(options.mu)}
    let right =     {sd:sample(options.sd),mu:sample(options.mu)}
    left.chain = this.getCol({sd:left.sd,mu:left.mu})
    right.chain = this.getCol({sd:right.sd,mu:right.mu})
    return {left,right}
  }
  nextMode(){
    const modes = [
      {
        mode:0,
        error:false,
        dynamic:false,
      },
      {
        mode:1,
        error:true,
        dynamic:false,
      },
      {
        mode:2,
        error:false,
        dynamic:true,
      }
    ];
    const i  = this.state.mode===2?0: this.state.mode +1;
    return modes[i]


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
    const {left,right,dynamic,error} = this.state
    const margin = {y:30,x:150}
    const dim = {h:450,w:200}
    const svgDim = {h:600,w:800}
    // const tickScale = scaleLinear()
    //         .domain([0,100])
    //         .range([dim.h+margin.y, margin.y]);
    return (
      <div className="App" style={{display:"flex", "justifyContent":"center",height:'100vh',width:"100%","alignItems":"center"}}>
        <div >
          <Settings
            left={{sd:left.sd,mu:left.mu}}
            right={{sd:right.sd,mu:right.mu}}
            handleSettings={this.handleSettings}
          />
        </div>
        <Card style={{maxWidth:1000}}>
          <CardContent>
            <Typography component="h2" variant="headline">Question</Typography>
            <Typography component="p">You are given a choice between game A and game B. Winning either game will yield the same prize. Your chance of winning is represented in the bar plots below. Which game would you choose?</Typography>
        <svg width = {svgDim.w} height = {svgDim.h}  >
          {
            [left,right].map((d,i)=>
            <g key={`${d}_bar`}>
              <Bar
                h={dim.h}
                w={dim.w}
                color="RoyalBlue"
                x={margin.x + i*1.5*dim.w}
                y={margin.y}
                label={i+""}
                sd={d.sd}
                chain={d.chain}
                mu={d.mu}
                dynamic={dynamic}
                error={error}
                t={150}
            />
            <Button
              x={margin.x + i*1.5*dim.w}
              y={dim.h+70}
              width={dim.w}
              height={20}
              onClick={this.handleNext}
            />
          {/* <text
              x={margin.x + i*1.5*dim.w+dim.w/2}
              y={dim.h+70+12}
              fontSize={12}
              textAnchor="middle"
              fill="white"
              stroke="black"
              strokeWidth="1"
              >Select</text> */}


          </g>

            )
          }

        <Axis
          x1={margin.x-35}
          x2={margin.x+2.5*dim.w}
          yBottom = {dim.h+margin.y}
          yTop = {margin.y}
          tickNumber={4}
        />


        </svg>



      </CardContent>


        </Card>


      </div>
    );
  }
}

export default App;
