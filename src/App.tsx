import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CryptoSummary from './components/CryptoSummary';
import { Crypto } from './types/Crypto';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import type { ChartData, ChartOptions } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


function App() {
  const [cryptos, setCryptos] =useState<Crypto[] | null>(null);
  const [selected, setSelected] =useState <Crypto | null >();
  const [data, setData] = useState<ChartData<"line">>();
  const [options,setOptions] = useState<ChartOptions<"line">>({
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
  });


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
       //request 
       axios.get(`https://api.coingecko.com/api/v3/coins/${c?.id}/market_chart?vs_currency=usd&days=30&interval=daily`).then((response) => {
        //setdata

        console.log(response.data)
        setData({
            labels:response.data.prices.map((price: number[]) =>{
              return price[0]

            }),
            datasets: [
              {
                label: 'Dataset 1',
                data: response.data.prices.map((price:number[]) =>{return price[1]}),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
              },
            ],
        })
       })
       // update data state
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
    {data &&<div style={{width:600}}><Line options={options} data={data}  /></div>}
    </>
    
  );
}

export default App;
