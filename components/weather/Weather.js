"use client"
import React,{useState,useEffect} from 'react'
import './weather.css'
import {BsSunset, BsSunrise, BsClouds, BsSun, BsCloudRainHeavy, BsCloudFog, BsMoisture, BsCalendarRange, BsCloudSun} from 'react-icons/bs'
import {TiWeatherCloudy, TiWeatherWindy} from 'react-icons/ti'
import {WiHumidity} from 'react-icons/wi'
import axios from 'axios'

import rainyBg from '@/components/statics/rainy.jpg'
import sunnyBg from '@/components/statics/sunny.jpg'
import windyBg from '@/components/statics/windy.jpg'
import fogBg from '@/components/statics/fog.jpg'


const Weather = ({setBg}) => {
  const [searchTerm, setSearchTerm] = useState("Ireland")
  const [data, setData] = useState({})
  const [weatherIcon, setWeatherIcon] = useState(<h1 className='font-light text-white text-3xl'>Clouds<BsClouds size={32}/></h1>)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [unit, setUnit] = useState('cel')


  useEffect(() => {
    getWeatherInfo();
},[]);

  const getWeatherInfo = async() => {
    setLoading(true)
    setError('')
    try{
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&units=metric&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`;
        const res = await axios.get(url)
        // console.log(res.data)
        setData(res.data)
    }catch(err){
        //console.log(err);
        setError(err?.response?.data?.message)
        setLoading(false)
    }
    setLoading(false)
};

useEffect(() => {
  // console.log('running')
  if(data?.weather?.[0]?.main){
      switch(data.weather[0].main){
          case "Clouds":
              setWeatherIcon(<h1 className='text-sm text-white'>Clouds<BsClouds size={32}/></h1>);
              setBg(windyBg)
          break;
          case "Rain":
            setWeatherIcon(<h1 className='text-sm text-white'>Raining<BsCloudRainHeavy size={32}/></h1>);
            setBg(rainyBg)
            break;
          case "Haze":
              setWeatherIcon(<h1 className='text-sm text-white'>Haze<BsCloudFog size={32}/></h1>);
              setBg(fogBg)
          break;
          case "Clear":
              setWeatherIcon(<h1 className='text-sm text-white'>Sunny<BsSun size={32}/></h1>);
              setBg(sunnyBg)
          break;
          case "Mist":
              setWeatherIcon(<h1 className='text-sm text-white'>Mist<BsMoisture size={32}/></h1>);
              setBg(fogBg)
          break;
          default:
              setWeatherIcon(<h1 className='text-sm text-white'>Clouds<BsCloudSun size={32}/></h1>);
              setBg(windyBg)
          break;

      }
  }
},[data]);


const timeCalc=(val)=>{
    let time = new Date(val * 1000);
    let timeStr = `${time.getHours()}:${time.getMinutes()}`;
    return timeStr;
}


  return (
    <div className='w-full md:w-[70%] mx-auto block-div p-4'>
      <div className='flex mb-3'>
        <input type='search' className='w-[90%] mr-2 p-2 rounded-lg' placeholder='City/Country name...'
        value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)}
        />
        <button className='w-[160px] text-white w-25 p-2 rounded-lg bg-blue-400' disabled={loading} onClick={getWeatherInfo}>{
          loading ? 
          'Loading...'
          :
          'Search'
        }</button>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3'>
        <div className='col-span-2 ... p-3'>
          <div className='flex justify-between'>
            <div>
          <h1 className='text-5xl font-light text-white'>{unit === 'fah' ? ((data?.main?.temp * 1.8) + 32).toFixed(2) : data?.main?.temp}&deg;</h1>
          <p className='font-light text-white flex text-lg mt-4'>min&nbsp;<span className='font-bold'>{unit === 'fah' ? ((data?.main?.temp_min * 1.8) + 32).toFixed(2) : data?.main?.temp_min}&deg;</span>&nbsp;max&nbsp;<span className='font-bold'>{unit === 'fah' ? ((data?.main?.temp_max * 1.8) + 32).toFixed(2) : data?.main?.temp_max}&deg;</span></p>
          <div className='flex my-4 gap-2 text-white'>
            <input type='radio' name='x' className='scale-150' value='cel' checked={unit === 'cel'} onClick={()=>setUnit('cel')}/>
            <p>celsius</p>
            <input type='radio' name='x' className='scale-150' value='fah' checked={unit === 'fah'} onClick={()=>setUnit('fah')}/>
            <p>fahrenheit</p>
          </div>
          </div>
          <div className='mt-3 mx-2'>
            <div>
            {weatherIcon}
            </div>
            {/* <h1 className='font-light text-white'> {weatherIcon}
            <BsSun size={32}/><BsCloudRainHeavy size={32}/><GiThermometerCold size={32}/>
            </h1> */}
            <h5 className='font-light text-white text-1xl md:text-3xl'>{data?.name}, {data?.sys?.country}</h5>
          </div>
          </div>
        </div>
        <div className='...'>
          <div className='humid text-center'>
            <div className='flex items-center  justify-center pt-5'>
            <h5 className='text-white t-shadow pt-3 font-light'>Humidity</h5>
            <WiHumidity size={32} className='text-white'/>
            </div>
            
            <h1 className='text-white font-light t-shadow text-4xl'>{data?.main?.humidity}</h1>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-2 md:grid-cols-4 my-10 p-5 sm:p-0 max-sm:ms-10'>
      <div className='... text-white rounded bottom-div mb-2 text-center'>
        <div className='flex items-center justify-center'>
        <h5 className='font-light text-center'>Sunrise</h5>
        <h5 className='font-light text-center ml-4'><BsSunrise size={32}/></h5>
        
        </div>
        <h3 className='font-light text-2xl'>{timeCalc(data?.sys?.sunrise)}</h3>
        </div>

        <div className='... text-white rounded bottom-div mb-2 text-center'>
        <div className='flex items-center justify-center'>
        <h5 className='font-light text-center'>Sunset</h5>
        <h5 className='font-light text-center ml-4'><BsSunset size={32}/> </h5>
        
        </div>
        <h3 className='font-light text-2xl'>{timeCalc(data?.sys?.sunset)}</h3>
        </div>
        
        <div className='... text-white rounded bottom-div mb-2 text-center'>
        <div className='flex items-center justify-center'>
        <h5 className='font-light text-center'>Pressure</h5>
        <h5 className='font-light text-center ml-4'><TiWeatherCloudy size={32}/></h5>
        
        </div>
        <h4 className='font-light text-2xl'>{data?.main?.pressure}</h4>
        </div>
        <div className='... text-white rounded bottom-div mb-2 text-center'>
        <div className='flex items-center justify-center'>
        <h5 className='font-light text-center'>Wind</h5>
        <h5 className='font-light text-center ml-4'><TiWeatherWindy size={32}/></h5>
        
        </div>
        <h4 className='font-light text-2xl'>{data?.wind?.speed}</h4>
        </div>
      </div>
{error ?
      <div className='my-5 p-1 bg-red-400 text-white t-shadow flex flex-wrap justify-center rounded-lg scale-100 transition delay-300 duration-300 ease-in-out'>
        <p>{error}</p>
      </div>
: null}
    </div>
  )
}

export default Weather