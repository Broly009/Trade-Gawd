// import { useState } from 'react'
// import {BrowserRouter , Routes, Route} from "react-router-dom"
// import {Stockoverview} from "./pages/Stockoverview"
// import {Stockdetail} from "./pages/Stockdetail"
import {BrowserRouter , Routes, Route} from "react-router-dom"
import Stockoverview from "./pages/Stockoverview"
import Stockdetail from "./pages/Stockdetail"
import { WatchListContextProvider } from "./context/watchlistcontext"


function App() {
  

  return (
    <main className="container">
   <WatchListContextProvider>
   <BrowserRouter>
   <Routes>
    <Route path="/" element={<Stockoverview/>}/>
    <Route path="/detail/:symbol" element={<Stockdetail/>}/>
   </Routes>
   </BrowserRouter>
   </WatchListContextProvider>
   </main>
    
    )
}

export default App
