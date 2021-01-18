import React, { useEffect, useState } from 'react';
import bagIcon from '../../../../assets/icons/maletita.png';
import orangeHomeIcon from '../../../../assets/icons/orangehome-m.png';
import backIcon from '../../../../assets/icons/back@3x.png';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Map from '../../../../shared/Map/Map'

const lockersUrl = "http://localhost:3001/lockers";
const baseUrl2 = "http://localhost:3001/usuarios";

export default function Locker(props) {

    const {lockerDetail} = useParams();
    let [locker, setLocker] = useState();
    let [user, setUser] = useState();
    if (user === null) {
        user = JSON.parse(sessionStorage.getItem('user'))[0];
    }

    useEffect(() => {
        axios.get(lockersUrl, { params: { id: lockerDetail } }).then(res => {
            let paramLocker = res.data[0].user;
            setLocker(res.data[0]);
        paramLocker && axios.get(baseUrl2, { params: { name: paramLocker } }).then(res => {
            setUser(res.data[0]);
            })
        })
        
    }, [])


    return (
        <div className="locker-container">
            <div className="container__orange-top">
                {props.page === 'booking' ? <Link to='/maps'><img className="locker-container__back-item" src={backIcon} alt="backIcon" /></Link> : <Link to='/lockerlist'><img className="locker-container__back-item" src={backIcon} alt="backIcon" /></Link>}
            </div>
             
            {locker && <img className="locker-container__locker-img" src={locker.image} alt={locker.image}/>}
            <div className="container__main">
                <div>
                    <div className="perfil">
                        {locker && <h4 >{locker.name}</h4>}
                        {locker && <p className="textos__grey">{locker.location}</p>}
                        {locker &&  <p className="textos__grey">Guardian: {locker.user}</p>}
                    </div>
                    {user && <img className="img-user__locker" src={user.image} alt={user.image}/>}
                </div>

                <div className="locker-container__border-grey">
                    {locker && <p> Espacio disponible: <img src={bagIcon} alt="bagIcon"/> {locker.available_Space}/{locker.available_Space}</p>}
                    <h4><img src={orangeHomeIcon} alt="orangeHomeIcon"/> Tipo de locker:</h4>
                    {locker && <p>{locker.locker_TypeB} en un {locker.locker_TypeA}</p>}
                 </div>
                <div className="locker-container__border-grey">
                    {locker && <p>{locker.description}</p>}
                </div>
   
                <h4>Ubicación</h4>
                <Map locker={locker}></Map>

                {props.page === 'booking'? locker && <Link to={locker && '/bookingconfirmation/'+locker.id}><input className="orangebtn__bottom" value="Reservar" type="submit" /></Link> : <input className="orangebtn__bottom" value="Editar" type="submit" />}
            </div>
        </div>
    )
}
