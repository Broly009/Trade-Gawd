import React from 'react'
import{useState,useEffect} from "react"
import finnhub from './apis/finnhub'

const Stockdata = ({symbol}) => {
    const[StockData,setStockData]=useState()
    useEffect(()=>{
        let isMounted=true;
        const fetchData = async()=>{
            try{
                const response = await finnhub.get("stock/profile2",{
                    params:{
                        symbol
                    }
                })
            console.log(response)
            if(isMounted){
                setStockData(response.data)
            }
            }
            catch(err){
                
            }
        }
        fetchData()
        return ()=>(isMounted=false)
    },[symbol])
  return (
    <div>
        {
        StockData && (
            <div className='row border bg-white rounded p-4 mt-5'>
                <div className='col'>
                    <div>
                        <span className='fw-bold'>Name: </span>
                        {StockData.name}
                    </div>
                    <div>
                        <span className='fw-bold'>Country: </span>
                        {StockData.country}
                    </div>
                    <div>
                        <span className='fw-bold'>Ticker: </span>
                        {StockData.ticker}
                    </div>
                </div>
                <div className='col'>
                <div>
                    <span className='fw-bold'>Exchange: </span>
                    {StockData.exchange}
                    </div>
                    <div>
                        <span className='fw-bold'>Industry: </span>
                        {StockData.finnhubIndustry}
                    </div>
                    <div>
                        <span className='fw-bold'>Ipo: </span>
                        {StockData.ipo}
                    </div>
                </div>
                
                <div className='col'>
                <div>
                    <span className='fw-bold'>MarketCap: </span>
                    {StockData.marketCapitalization}
                    </div>
                    
                    <div>
                        <span className='fw-bold'>URL: </span>
                        <a href={StockData.weburl}>{StockData.weburl}</a>
                    </div>
                </div>
            </div>
        )
        }
    </div>
  )
}

export default Stockdata