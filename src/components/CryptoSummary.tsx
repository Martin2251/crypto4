import React from 'react'
import { Crypto } from '../types/Crypto'

export type AppProps = {
    crypto: Crypto
}

const CryptoSummary = ({crypto}:AppProps): JSX.Element => {
  return (
  <p> <p>{crypto.name + '$' + crypto.current_price}</p></p>
  )
}

export default CryptoSummary