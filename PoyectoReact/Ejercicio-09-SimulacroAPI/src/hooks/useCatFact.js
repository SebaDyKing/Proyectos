import { useState, useEffect } from 'react';

export function useCatFact() {
  const [fact,setFact] = useState("Lorem imsup cat fact")
  const [image,setImage] = useState()

    const API_KEY = "uQroqtpy3LvJOTWsf21UBcr79ihEC4G5"

    const refreshFact = async () => {
      const resFact = await fetch("https://catfact.ninja/fact")
      const dataFact = await resFact.json()
      const firstThreeWords = dataFact.fact.split(" ",3).join(" ")
      setFact(dataFact.fact)


      const resImage = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${firstThreeWords}`)
      const dataImage = await resImage.json()
      setImage(dataImage.data[0]?.images.original.url)

    }
    useEffect(() => {
      refreshFact()
    }, [])
    return {fact,image,refreshFact}
}

export default useCatFact