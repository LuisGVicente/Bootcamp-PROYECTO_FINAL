import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Menu from '../../core/Menu/Menu';
import '../../pages/User/User/User.scss'

const lockersUrl = "http://localhost:3001/lockers";

export default function Maplist(params) {

    let [locker, setLocker] = useState();

    useEffect(() => {     //ESTO SE PUEDE USAR PARA LLAMAR A TODOS LOS LOCKERS
        axios.get(lockersUrl).then(res => {
            setLocker(res.data);
        })
    }, [])
    let lock = locker && locker.map((lock)=>{
        return <div className="c-user__info" key={lock.id}>
            <Link to={"/booking/"+ lock.id}>//ESTE ES EL LINK QUE TE LLEVA A LA RESERVA
            <p>Nombre: {lock.name}</p>
            <p>Guardian: {lock.user}</p>
            <p>Dirección: {lock.location}</p></Link>
            
            </div>
    })

    return(
        <>
        <div>{lock}</div>
        <Menu></Menu>
        </>
    )
}