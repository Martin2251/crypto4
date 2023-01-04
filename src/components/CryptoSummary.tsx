import React, {useState, useEffect}from 'react'
import { Crypto } from '../types/Crypto'

export type AppProps = {
    crypto: Crypto
}

const CryptoSummary = ({crypto}:AppProps): JSX.Element => {

  useEffect(() => {
    console.log(crypto.name, amount, crypto.current_price * parseFloat(amount));
  })

  const [amount, setAmount] = useState<string>('0');
  return (
    <div>
   <span> {crypto.name + '$' + crypto.current_price}</span>
   <input value={amount} style={{margin:10}} onChange={(e) =>{setAmount(e.target.value)}} type="number"></input>
   <p> ${(crypto.current_price * parseFloat(amount)).toLocaleString(undefined,{minimumFractionDigits:2, maximumFractionDigits:2})}</p>
   </div>
  )
}

export default CryptoSummary