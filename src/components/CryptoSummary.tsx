import React from 'react'
import { Crypto } from '../types/Crypto'

export type AppProps = {
    crypto: Crypto
}

const CryptoSummary = ({crypto}:AppProps): JSX.Element => {
  return (
    <>
   <span> {crypto.name + '$' + crypto.current_price}</span>
   <input defaultValue={1000}></input>
   </>
  )
}

export default CryptoSummary