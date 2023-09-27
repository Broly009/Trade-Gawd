import React from 'react'
import {useState,useEffect,useContext} from "react"
import finnhub from './apis/finnhub';
import { WatchListContext } from '../context/watchlistcontext';

const Autocomplete = () => {
  const[search, setSearch] = useState("");
  const[results, setResult] = useState([]);
  const {addStock} = useContext(WatchListContext)

  const showRes=()=>{
      const dropdownClass = search ? "show" : null;
      return(
      <ul style={{
        height:"500px",
        overflowY:scroll,
        overflowX:"hidden",
        cursor:"pointer"
      }} className={`dropdown-menu ${dropdownClass}`}>
          {results.map((result)=>{
            return(
              <li onClick = {()=>{
                addStock(result.symbol)
                setSearch("")
              }} 
              className='dropdown-item'>{result.description}
              {result.symbol}</li>
            )
          })}
          
          </ul>)
  }
  useEffect(()=>{
    let isMount=true
    const fetchData = async()=>{
      try{
          const response= await finnhub.get("/search", {
            params:{
              q:search
            }
          })
          if(isMount){
          setResult(response.data.result);
          }
      }
      catch(err){

      }
    }
    if(search.length>0){
      fetchData();
    }else{
      setResult([])
    }
    return ()=>(isMount=false);
  },[search])

  return (
    <div className='w-50 p-5 rounded mx-auto'>
      <div className='form-floating dropdown'>
        <input id='search' type='text' className='form-control'
         placeholder='search' autoComplete='off' value={search}
         onChange={(e)=>setSearch(e.target.value)
         }></input>

         <label htmlFor='search'>search</label>
         {showRes()}
         
      </div>
    </div>
  )
}

export default Autocomplete