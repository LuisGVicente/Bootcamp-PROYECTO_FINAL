import '../../index.scss'
import React  from 'react';
import Menu from '../../core/Menu/Menu';

export default function App (props) {

    const  initMap = (latitud, longitud) => {
    const myLatLng = { lat: latitud, lng: longitud };
    const map = new window.google.maps.Map(document.getElementById("map"), {
      zoom: 7,
      center: myLatLng,
    });
    new window.google.maps.Marker({
      position: myLatLng,
      map,
      title: "Hello World!",
    });
  }


  return (
    <>

    <div className="App">
    <div className ="Map" id="map"> {props.locker && initMap(props.locker.lat, props.locker.lng)} 
    </div>
    </div>
    <Menu></Menu> 
    </>
  );
}


