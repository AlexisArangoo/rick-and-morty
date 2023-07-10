import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import getRandomNumber from './utils/getRandomNumber'
import LocationInfo from './components/LocationInfo'
import ResidentCard from './components/ResidentCard'
import FormLocation from './components/FormLocation'
import Pagination from './components/Pagination'

function App() {
const [location, setLocation] = useState()
const [idLocation, setIdLocation] = useState(getRandomNumber(126))
const [hasError, setHasError] = useState(false)
const [isLoading, setIsLoading] = useState(true)

//estados paginacion:
const [characterPerPage, setcharacterPerPage] = useState(12)
const [currentPage, setCurrentPage] = useState(1)

const totalcharacter = location?.residents.length
const lastIndex = currentPage * characterPerPage
const firstIndex = lastIndex - characterPerPage

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
    setCurrentPage={setCurrentPage}
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
      
      {
      totalcharacter > 0
      ?(
        <>
        <div className='resident_container'>

        {
          location?.residents.map(url => (
            <ResidentCard 
             key={url}
             url={url}
            />
          )).slice(firstIndex, totalcharacter <= 12 ? totalcharacter : lastIndex)
        }

       </div>

        <div className='container_pagination'>
        <Pagination
        characterPerPage={characterPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalcharacter={totalcharacter}
        />
      </div>
      </>
      )
      :(<h2 style={{textAlign: 'center', color: 'white'}}>No hay poblacion en esta location😣</h2>)
      }
      </>
      )
      )
      
    }



    </div>
  )
}

export default App
