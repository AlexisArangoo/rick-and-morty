import './styles/LocationInfo.css'

const LocationInfo = ({location}) => {


  return (
    <article className="locationInfo">
        <h2 className="locationInfo_name">{location?.name}</h2>
        <ul className="locationInfo_list">
            <li className="locationInfo_items"><span className="locationInfo_label">Type: </span><span className="locationInfo_value">{location?.type}</span></li>
            <li className="locationInfo_items"><span className="locationInfo_label">Dimension: </span ><span className="locationInfo_value">{location?.dimension}</span></li>
            <li className="locationInfo_items"><span className="locationInfo_label">Population: </span><span className="locationInfo_value">{location?.residents.length}</span></li>
        </ul>
    </article>
  )
}

export default LocationInfo