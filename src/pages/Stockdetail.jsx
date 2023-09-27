import React from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import finnhub from '../components/apis/finnhub'
import Stockchart from '../components/chart'
import Stockdata from '../components/Stockdata'

const formatData = (data)=>{
  return data.t.map((el,index)=>{
    return{
      x:el*1000,
      y:Math.floor(data.c[index])
    }
  })
}

const Stockdetail = () => {
  const [chartData,setchartData] = useState();

  const {symbol} = useParams()
  useEffect(()=>{
    const fetchData = async()=>{
      const date= new Date();
      const currTime = Math.floor(date.getTime()/1000);
      let oneDay
      if(date.getDay()===6){
        oneDay = currTime - 2*24*3600;
      }
      else if(date.getDay()===0){
        oneDay = currTime - 3*24*3600;
      }
      else{
        oneDay = currTime - 24*3600;
      }
      const oneWeek = currTime - 7*24*3600;
      const oneYear = currTime - 365*24*3600

      try{
        const responses = await Promise.all([
          finnhub.get("/stock/candle",{
            params:{
              symbol,
              from : oneDay,
              to : currTime,
              resolution: 30
            }
          }),finnhub.get("/stock/candle",{
            params:{
              symbol,
              from : oneWeek,
              to : currTime,
              resolution: 60
            }
          }),finnhub.get("/stock/candle",{
            params:{
              symbol,
              from : oneYear,
              to : currTime,
              resolution: "W"
            }
          })])
       
        console.log(responses)

        setchartData({
          day:formatData(responses[0].data),
          week:formatData(responses[1].data),
          year:formatData(responses[2].data)
        })
      }
      catch(err){
        console.log(err)
      }
    }
    fetchData()
  },[symbol])


  return (<div>
    {chartData && (
      <div>
        <Stockchart chartData={chartData} symbol={symbol}/>
        <Stockdata symbol={symbol}/>
      </div>
    )}
  </div>)
}

export default Stockdetail