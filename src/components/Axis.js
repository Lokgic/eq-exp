import React from 'react'
import styled from 'styled-components'
import {scaleLinear} from 'd3-scale'

const Tick = styled.line`
  stroke:black;
  stroke-width:1;
  stroke-dasharray:5, 5;
  opacity: 0.5;
`


export default ({tickNumber,x1,x2,yTop, yBottom} )=>{
  const tickScale = scaleLinear()
          .domain([0,tickNumber])
          .range([yTop, yBottom]);
  const numberScale = scaleLinear()
          .domain([0,tickNumber])
          .range([100, 0]);
  return (
  <g>
    {
      [...Array(tickNumber+1).keys()].map(d=>(
        <g key={`tick_g_${d}`}>
          <Tick
            key = {`tick_${d}`}
            x1={x1}
            x2={x2}
            y1={tickScale(d)}
            y2={tickScale(d)}
          />
          <text
            key = {`tick_txt_${d}`}
            x={x1}
            y={tickScale(d)-3}
            fontSize={8}
            fill="grey"
            >
            {`${numberScale(d)}%`}
          </text>
        </g>
        ))
    }

  </g>
)}
