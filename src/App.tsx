import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CryptoSummary from './components/CryptoSummary';
import { Crypto } from './types/Crypto';


function App() {
  const [cryptos, setCryptos] =useState<Crypto[] | null>(null);
  const [selected, setSelected] =useState <Crypto | null >();


  useEffect(() => {
    const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
    axios.get(url).then((response) => {
      setCryptos(response.data);
    });
  },[]);
  return (
    <>
    <div className="App">
      <select onChange={(e) =>{
       const c =  cryptos?.find((x) => x.id === e.target.value);
       setSelected(c);
       }}
       defaultValue="default"
       >
      {cryptos ? cryptos.map((crypto) =>{
     return <option key={crypto.id} value={crypto.id}>{crypto.name}</option>

      }) : <p>no cryptos !!</p>}
      <option value="default">choose an option</option>
      </select>
    </div>
    {selected &&<CryptoSummary crypto={selected}  />}
    </>
    
  );
}

export default App;
