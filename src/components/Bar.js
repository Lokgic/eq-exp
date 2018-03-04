import React,{Component} from 'react'
import {interval} from 'd3-timer'
import { easeSin as easeFn } from 'd3-ease';
import Animate from 'react-move/Animate';
import {axisRight} from 'd3-axis'
import {scaleLinear} from 'd3-scale'
export default class Bar extends Component{
	constructor(props){
    super(props)
    const {h,w,color,x,y,label,error,sd,chain,dynamic,mu,t} = props

    this.chain = chain
    // const currentMu = dynamic? chain[0]:mu;
    const step = 0;
    this.state = {
      h,w,color,x,y,label,error,sd,mu:mu,step,dynamic,
      visible:1,
      t
    };


  }
	componentWillReceiveProps(nextProps){
		if (this.t) {
			this.t.stop()
		}
		const {h,w,color,x,y,label,error,sd,chain,dynamic,mu,t} = nextProps
		this.chain = chain
		// const currentMu = dynamic? chain[0]:mu;
		const step = 0;
		this.setState({
			h,w,color,x,y,label,error,sd,mu,step,dynamic,
			visible:1,
			t
		});
		if (dynamic){
      this.t = interval(()=>{
        const nextStep = this.state.step >= this.chain.length? 0:this.state.step+1;
        this.setState({step:nextStep});
      },this.state.t)
    }
	}
  componentDidMount(prevProps, prevState){
		const yScale = scaleLinear()
						.domain([0,1])
						.range([this.state.h,0]);
		const yAxis = axisRight(yScale)
					.tickSize(250)
					.tickFormat(d=>d);
	yAxis(this.g)
	// const styledYAxis = (g)=>{
	// 	g.call(yAxis)
	// 	g.select(".domain").remove();
	// 	g.selectAll(".tick:not(:first-of-type) line").attr("stroke", "#777").attr("stroke-dasharray", "2,2");
	// 	g.selectAll(".tick text").attr("x", 4).attr("dy", -4);
	// 				}
	// 	styledYAxis(this.g)
    if (this.state.dynamic){
      this.t = interval(()=>{
        const nextStep = this.state.step >= this.chain.length? 0:this.state.step+1;
        this.setState({step:nextStep});
      },this.state.t)
    }
  }

  render(){
    const {h,w,color,x,y,label,error,sd,mu,step,dynamic} = this.state;
    const p = dynamic?this.chain[step]*h:mu*h;
    const sdLen =  sd*h*1.96
		const eX = w/2
		const ey1 = h - (mu*h + sdLen)
		const ey2 = h - (mu*h - sdLen)
		const y1 = h - (p + sdLen)
		const y2 = h - (p - sdLen)
		const hBarLen = 5

    return(
      <g transform={`translate(${x},${y})`}>
        {/* <rect width={w}
              height={p}
              fill={color}
              x={0}
              y={h-p}
              /> */}
				<g id="axis" ref={g=>this.g=g} />
        <Animate
          show
          start={{
            height:p,
          }}

          update={{
            height:[p],
            timing: { duration: this.state.t, ease: easeFn }
          }}
          >
            {
              ({height})=>{
                return (
                  <g>
                    <rect width={w}
                          height={height}
                          fill={color}
                          x={0}
                          y={h-height}
                          />
                    <rect width={w}
                          height={h-height}
                          fill="grey"
                          x={0}
                          y={0}
                          />
                  </g>

              )}
            }

        </Animate>
        {/* <rect width={w}
              height={h-p}
              fill="grey"
              x={0}
              y={0}
              /> */}
        {(error&&sd)?
          <g>
          <line
            x1={eX}
            x2={eX}
            y1={ey1}
            y2={ey2}
            stroke="black"
            strokeWidth="2"
          />
          <line
            x1={eX-hBarLen}
            x2={eX+hBarLen}
            y1={ey2}
            y2={ey2}
            stroke="black"
            strokeWidth="2"
          />
          <line
            x1={eX-hBarLen}
            x2={eX+hBarLen}
            y1={ey1}
            y2={ey1}
            stroke="black"
            strokeWidth="2"
          />
          </g>
          :null}
        {label?<text x={eX} y ={h+20} textAnchor='middle' fontSize = {12}>{label}</text>:null}
      </g>
    )
  }
}
