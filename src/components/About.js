import React,{useState} from 'react'

const About = () => {
  const [count, setcount] = useState(0)
  const up = () => {
    setcount(count+1)
  }
  const down = () => {
    setcount(count - 1)
  }
  return (
    <>
      <h1>{count}</h1>
      <button onClick={down}>{'<'}</button> <button onClick={up}>{'>'}</button>
    </>
  )
}

export default About