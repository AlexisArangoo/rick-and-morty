import axios from "axios"
import { useState,useEffect } from "react"
import getRandomNumber from "../utils/getRandomNumber"
import './styles/FormLocation.css'
import Select from "react-select"

export const FormLocation = ({setIdLocation, setCurrentPage}) => {

    const [addLocation, setAddLocation] = useState([])
    const [stateSearch, setStateSearch ] = useState(true)
    const [searchString, setSearchString] = useState('ID Location')

    const arrLocation = []

    for (let i = 1; i <= 126; i++) {
        arrLocation.push(i)
    }

    useEffect(() => {
        const url = `https://rickandmortyapi.com/api/location/${arrLocation}` 
      axios.get(url)
      .then( resp => {
        setAddLocation(resp.data)
      })
      .catch(err => console.error(err))
    }, [])

    const handleSubmit = e =>{
        e.preventDefault()
        const inputValue= e.target.inputId.value.trim()
        if (inputValue === '' || inputValue === '0') {
            setIdLocation(getRandomNumber(126))
            setCurrentPage(1)
        }else{
            setIdLocation(e.target.inputId.value.trim())  
            setCurrentPage(1)
        }
        e.target.inputId.value = ''
    }
    const handleChange = e => {
        setIdLocation(e.value)
    }
    const search = () => {
        setStateSearch(!stateSearch)

        if (stateSearch) {
            setSearchString('Name Location')
        } else {
            setSearchString('ID Location')
        }
    }

  return (
    <div className="container">
    <div className="container_search">
        <span className="search_label">To Look For: </span>
        <button onClick={search} className="search_btn">{searchString}</button>
    </div>
    <div className="container_form">

    {
        stateSearch
        ?(
    <form onSubmit={handleSubmit} className="form">
        <input className="form_input" id="inputId" type="text" placeholder="Type the ID" />
        <button className="form_btn" style={{background: 'green', color: 'white'}}>Search</button>
    </form>
        )
        :(
            addLocation.length > 0 && (
                <Select
                placeholder='Enter the name'
                  className="form_select"
                  onChange={handleChange}
                  options={addLocation.map((id) => ({ label: id.name, value: id.id }))}
                />
              )
        )
    }
    </div>
    </div>
  )
}

export default FormLocation