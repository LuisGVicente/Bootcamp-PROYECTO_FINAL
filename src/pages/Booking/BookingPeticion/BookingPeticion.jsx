import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Menu from '../../../core/Menu/Menu';
import backIcon from '../../../assets/icons/back@2x.png';
import axios from 'axios';
import {UserContext} from '../../../contexts/UserContext'
import BookingSmall from '../BookingSmall/BookingSmall';

const bookingUrl = "http://localhost:3001/booking";

export default function BookingPeticion() {

    let [peticionReserva, setPeticionReserva] = useState();
    let [recepcionReserva, setRecepcionReserva] = useState();
    let [userQueHaceReserva, setUserQueHaceReserva] = useState();

    

    let {user} = useContext(UserContext);
    if (user === null) {
        let userSessionStorage = JSON.parse(sessionStorage.getItem('user'));
        user = userSessionStorage[0];
    }

    useEffect(() => {
        axios.get(bookingUrl, { params: { guardianID: user.id } }).then(res => {
            console.log(res.data);
            setRecepcionReserva(res.data);
        })
        axios.get(bookingUrl, { params: { userID: user.id } }).then(res => {
            setPeticionReserva(res.data);

        })
    }, [])

    return (
        <div>
            <div className="container__orange-top">
                <Link to='/user'><img src={backIcon} alt="backIcon" /></Link>
                <div className="titulo"><h4>Petición de reservas</h4></div>
            </div>
            <div>
               {recepcionReserva && recepcionReserva.map((reserva)=>{
                    return <BookingSmall recepcionReserva={reserva} ></BookingSmall>
               })}
            </div>
            <Menu></Menu>
        </div>
    )
}


