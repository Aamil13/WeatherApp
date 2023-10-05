"use client"
import React, { useState } from 'react'
import './home.css'
import Weather from './weather/Weather'

import windyBg from '@/components/statics/windy.jpg'
// import windyBg from '../statics/windy.jpg'


const HomeView = () => {
  const [bg, setBg] = useState(windyBg)

  return (
    <div className='main-div' style={{backgroundImage: `url(${bg.src})`}}>
      <img src={windyBg} alt="" />
        <h1 className='py-5 text-5xl max-sm:text-xl text-center text-white shadow mb-5'>Weather Report</h1>
        <Weather setBg={setBg}/>
    </div>
  )
}

export default HomeView