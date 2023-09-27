import React, { useState } from 'react'
import Chart from "react-apexcharts"

const Stockchart = ({chartData,symbol}) => {
    const[dateFormat,setdateFormat] = useState('24h')
 const {day,week,year} = chartData
 const timeFormat=()=>{
    switch(dateFormat){
        case "24h":
         return day
        case "7d":
         return week
        case "1y":
         return year
        default:
         return day
    }
}
 const color = timeFormat()[timeFormat().length-1].y
 -timeFormat()[0].y>0?"#26C281":"#ed3419"
 const options={
    colors:[color],
    title:{
        text:symbol,
        align:"center",
        style:{
            fontSize:"25px"
        }
    },
    chart:{
        id:"stock data",
        animation:{
        speed:1400
    }
 },
    xaxis: {
    type: 'datetime',
    labels:{
        datetimeUTC:false
    }
  },tooltip:{
    x:{
        format:"MMM dd HH:MM"
    }
} 
}


const series =[{
    name:symbol,
    data:timeFormat()
}]

const selectedBtn=(button)=>{
    const classes="btn m-1 "
   if(button===dateFormat){
    return classes + "btn-primary"
   }
   else{
    return classes + "btn-outline-primary"
   }
}
 
  return (
    <div className='mt-5 p-4 bg-white w-100 '>
        <div >
        <Chart  options={options} series={series} type="area" width="90%" />
        </div>
        <div>
            <button className={selectedBtn("24h")} onClick={()=>{setdateFormat("24h")}}>24h</button>
            <button className={selectedBtn("7d")}onClick={()=>{setdateFormat("7d")}}>7d</button>
            <button className={selectedBtn("1y")}onClick={()=>{setdateFormat("1y")}}>1y</button>
        </div>
    </div>
  )
  
}

export default Stockchart;