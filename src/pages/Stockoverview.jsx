import React from 'react'
import Autocomplete from '../components/autocomplete';
import Stocklist from '../components/stocklist';
import { BsBarChartLine } from "react-icons/bs";

const Stockoverview = () => {
  return (
    <div>
      <div className='text-center'>
        <BsBarChartLine className='mt-5' size={70} color={"#2eab58"}/>
        <h3 style={{fontFamily:"'Roboto Mono', monospace"}}>TradeGawd</h3>

      </div>
        <Autocomplete/>
        <Stocklist/>
    </div>
  )
}

export default Stockoverview;