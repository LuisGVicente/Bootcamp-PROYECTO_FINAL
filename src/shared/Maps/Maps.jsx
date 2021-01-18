import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";
import { Link, useHistory } from "react-router-dom";
import backIcon from '../../assets/icons/back@3x.png'
import Menu from "../../core/Menu/Menu";
import {UserContext} from '../../contexts/UserContext';


function Map() {
    const [selectedGuardian, setselectedGuardian] = useState(null);
    const lockersUrl = "http://localhost:3001/lockers";
    const history = useHistory();

    let {user} = useContext(UserContext);
    if (user === null) {
        let userSessionStorage = JSON.parse(sessionStorage.getItem('user'));
        user = userSessionStorage[0];
    }


    let [locker, setLocker] = useState();

    useEffect(() => {     //ESTO SE PUEDE USAR PARA LLAMAR A TODOS LOS LOCKERS
        axios.get(lockersUrl).then(res => {
          console.log(res.data);  
          setLocker(res.data);
        })
    }, [])
  
    return (
    <GoogleMap
      defaultZoom={15}
      defaultCenter={{
        lat: 40.4168,
        lng: -3.703426 }}
    >
    
    {locker && locker.map((ubicacion) => (
        <Marker 

          key={ubicacion.id}
          position={{
            lat: ubicacion.lat,
            lng: ubicacion.lng,
          }} 
          onClick={() => {
            setselectedGuardian(ubicacion);
          }}
        />
    ))}

      {selectedGuardian && (
        <InfoWindow
          position={{
            lat: selectedGuardian.lat,
            lng: selectedGuardian.lng
          }}
          onCloseClick={() =>{
            setselectedGuardian(null);
          }}
          
        >
          <div onClick={() => {
            history.push('/booking/'+ selectedGuardian.id);
            
          }}>
          <h2> {selectedGuardian.name}</h2>
          <h2> {selectedGuardian.user}</h2>
          <p> {selectedGuardian.location}</p>
          <p>{selectedGuardian.description}</p>
          </div>
        </InfoWindow>
    )}
    </GoogleMap>
    );
}


const WrappedMap = withScriptjs(withGoogleMap(Map));

export default function App() {

  return (
    <>
    <div className="container__orange-top">
    <Link to='/Home'><img src={backIcon} alt="backIcon" /></Link>
    <div className="titulo"><h4>Mapa</h4></div>
    </div> 
<div style={{ width: "100vw", height: "100vh"}}>
    <WrappedMap
    googleMapURL={'https://maps.googleapis.com/maps/api/js?key=AIzaSyDgRediGnzHAHPhUqk-bZxgLLqYd9Qhu-k&v=3.exp&libraries=geometry,drawing,places'}
    loadingElement={<div style ={{height: "100%"}}/>}
    containerElement={<div style={{height: "100%"}} />}
    mapElement={<div style={{height:"100%"}}/>}
  />
</div>
<Menu></Menu>
</>
);
}
