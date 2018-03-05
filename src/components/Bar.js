import React,{Component} from 'react'
import {interval} from 'd3-timer'
import { easeSin as easeFn } from 'd3-ease';
import Animate from 'react-move/Animate';


export default class Bar extends Component{
	constructor(props){
    super(props)
    const {h,w,color,x,y,label,error,sd,chain,dynamic,mu,t} = props


    // const currentMu = dynamic? chain[0]:mu;
    const step = 0;
    this.state = {
      h,w,color,x,y,label,error,sd,mu,step,dynamic,chain,
      visible:1,
      t
    };


  }
	componentWillReceiveProps(nextProps){
		if (this.t) {
			this.t.stop()
		}
		const {h,w,color,x,y,label,error,sd,chain,dynamic,mu,t} = nextProps

		// const currentMu = dynamic? chain[0]:mu;
		const step = 0;
		this.setState({
			h,w,color,x,y,label,error,sd,mu,step,dynamic,chain,
			visible:1,
			t
		});
		if (dynamic){
      this.t = interval(()=>{

        const nextStep = this.state.step >= chain.length - 1? 0:this.state.step+1;

        this.setState({step:nextStep});
      },this.state.t)
    }
	}
  componentDidMount(prevProps, prevState){



    if (this.state.dynamic){
      this.t = interval(()=>{

        const nextStep = this.state.step >= this.state.chain.length? 0:this.state.step+1;

        this.setState({step:nextStep});
      },this.state.t)
    }
  }

  render(){
    const {h,w,color,x,y,label,error,sd,mu,step,dynamic,chain} = this.state;
    const p = dynamic?chain[step]*h:mu*h;
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
