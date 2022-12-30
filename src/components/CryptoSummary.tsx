import React from 'react'

const CryptoSummary = (props:any) => {
  return (
  <p> <p>{props.crypto.name + '$' + props.crypto.current_price}</p></p>
  )
}

export default CryptoSummary