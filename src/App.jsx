import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import getRandomNumber from './utils/getRandomNumber'
import LocationInfo from './components/LocationInfo'
import ResidentCard from './components/ResidentCard'
import FormLocation from './components/FormLocation'

function App() {
const [location, setLocation] = useState()
const [idLocation, setIdLocation] = useState(getRandomNumber(126))
const [hasError, setHasError] = useState(false)
const [isLoading, setIsLoading] = useState(true)

useEffect(() => {

  const url = `https://rickandmortyapi.com/api/location/${idLocation}`
  setIsLoading(true)
  axios.get(url)
    .then(resp => {
      setLocation(resp.data)
      setHasError(false)
    })
    .catch(err => {
      console.error(err)
      setHasError(true)
    })
    .finally(() => {
      setIsLoading(false)
    })
}, [idLocation])



  return (
    <div className='body'>
      
    <img className='header_img' src="/img/img-header.png" alt="" />
      
    <FormLocation
    setIdLocation={setIdLocation}
    />

    {
      isLoading
      ?(<h2 style={{width: '100%', textAlign: 'center'}}>Loading...</h2>)

      :(
        hasError
      ?(<h2 style={{width: '100%', textAlign: 'center'}}>❌ Hey! you mus provide an ID from 1 to 126 🙁</h2>)

      :(
        <>
      
        <LocationInfo
         location={location}
        />
      <div className='resident_container'>

        {
          location?.residents.map(url => (
            <ResidentCard 
             key={url}
             url={url}
            />
          ))
        }
      </div>
      </>
      )
      )
      
    }



    </div>
  )
}

export default App
