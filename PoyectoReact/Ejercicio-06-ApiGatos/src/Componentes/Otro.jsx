import { useCatFact } from '../hooks/useCatFact'
export function Otro() {
  const {imageUrl} = useCatFact()

  return (
    <>
    {imageUrl && <img src={imageUrl} alt="Imagen de un gato" />}
    </>
  )
}