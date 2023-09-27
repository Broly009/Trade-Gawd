import { createContext,useState} from "react";
export const WatchListContext = createContext();
export const WatchListContextProvider =(props)=>{
    
    const[ watchlist,setWatchlist] = useState(
     ["GOOGL", "MSFT" , "AMZN"]
    )
    
    
   

    const addStock=(stock)=>{
        if(watchlist.indexOf(stock) === -1){
        setWatchlist([...watchlist,stock])
        }
    }
    const delStock = (stock)=>{
        setWatchlist(watchlist.filter((el)=>{
            return el != stock
        }))
    }

    return <WatchListContext.Provider  value={{watchlist,addStock,delStock}}>
        {props.children}
    </WatchListContext.Provider>
    }