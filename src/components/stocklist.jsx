import React from 'react'
import { useState,useEffect,useContext} from 'react'
import finnhub from './apis/finnhub'
import { BsArrowDown,BsArrowUp,BsFillTrash3Fill } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { WatchListContext } from '../context/watchlistcontext';
import "../App.css"

const Stocklist = () => {
    const[stock, setStock] = useState([]);
    const {watchlist,delStock}=useContext(WatchListContext)
  
    const navigate = useNavigate();
    
    const changecolor = (change)=>{
      return change>0 ? "success" : "danger";
    }

    const rendericon = (change)=>{
      return change>0 ? <BsArrowUp/> : <BsArrowDown/>;
    }

    useEffect(()=>{
        let ismount=true;
      const fetchData = async ()=>{
        
        try {
            const responses = await Promise.all(watchlist.map((stock)=>{
                return finnhub.get("/quote?",{
                    params:{
                        symbol:stock
                    }
                }
                )
            }))
          
            const data = responses.map((response)=>{
               return {
                data:response.data,
                symbol:response.config.params.symbol

               } 
            })
            console.log(data)
            if(ismount){
                setStock(data)
            }
        }
        catch (err){

        }
      }
      fetchData()
      return()=>{
        ismount=false;
      }
    },[watchlist])
    const selectedStock=(symbol)=>{
        navigate(`detail/${symbol}`)
    }

  return <div>
    <table className='table hover mt-5'>
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">last</th>
          <th scope="col">chg</th>
          <th scope="col">chg%</th>
          <th scope="col">high</th>
          <th scope="col">low</th>
          <th scope="col">open</th>
          <th scope="col">close</th>
        </tr>
      </thead>
      <tbody>
        {stock.map((stockdata)=>{
          return (
            
              
                <tr style={{cursor:"pointer"}}onClick={()=>selectedStock(stockdata.symbol)}  className='table-row' key={stockdata.symbol}>
                  <th scope="row">{stockdata.symbol}</th>
                  <td>{stockdata.data.c}</td>
                  <td className={`text-${changecolor(stockdata.data.d)}`}>{stockdata.data.d}{rendericon(stockdata.data.d)}</td>
                  <td className={`text-${changecolor(stockdata.data.dp)}`}>{stockdata.data.dp}{rendericon(stockdata.data.d)}</td>
                  <td>{stockdata.data.h}</td>
                  <td>{stockdata.data.l}</td>
                  <td>{stockdata.data.o}</td>
                  <td>{stockdata.data.pc} <button onClick={(e)=>{
                    e.stopPropagation()
                    delStock(stockdata.symbol)
                  }}
                  className='btn btn-danger btn-sm ml-5 d-inline-block 
                  delete-button'><BsFillTrash3Fill/></button></td>
                </tr>
            )
        })}
      </tbody>
     
    </table>
  </div>
  
}
export default Stocklist