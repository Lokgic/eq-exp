import styled from 'styled-components';
import React from 'react'


const Container = styled.div`
  display:flex
`
const Select = styled.select`

`

export default ({options,title,selected})=>(
  <Container>
    <label>{title}</label>
    <Select>
      {options.map(({value,text})=>(
        <option
          value={value}
          selected={value==selected?"selected":null}
          >
          {text?text:value}
        </option>
      ))}
    </Select>
  </Container>
)
