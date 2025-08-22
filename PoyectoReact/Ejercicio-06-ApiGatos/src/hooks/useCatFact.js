import { useState, useEffect } from 'react'
import { getRandomFact } from './facts'

export function  useCatFact() {
  const [fact, setFact] = useState('')
  const [imageUrl, setImageUrl] = useState('')


  const refreshFact = () => {
     getRandomFact()
     .then(({ fact, firstWord }) => {
       setFact(fact)
       setImageUrl(`https://cataas.com/cat/says/${firstWord}?fontSize=50&fontColor=red`)
       
      })
  
  }
  useEffect(() => {
    refreshFact()
  }, [])
  return {fact,imageUrl,refreshFact}
}

export default useCatFact