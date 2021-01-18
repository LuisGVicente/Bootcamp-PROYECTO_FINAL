import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import {UserContext} from '../../../contexts/UserContext'

const baseUrl2 = "http://localhost:3001/usuarios";

function BookingSmall(props) {

    let [userQueHaceReserva, setUserQueHaceReserva] = useState();

    let {user} = useContext(UserContext);
    if (user === null) {
        let userSessionStorage = JSON.parse(sessionStorage.getItem('user'));
        user = userSessionStorage[0];
    }

    useEffect(() => {
        axios.get(baseUrl2, { params: { id: props.recepcionReserva.userID } }).then(res => {
            setUserQueHaceReserva(res.data);
        })
    }, [])

    var room = 'maleteo';

    return (
                        <div className="c-user container__main">
                            <div >
                                <img className="c-user__img" src={userQueHaceReserva && userQueHaceReserva[0].image} alt={userQueHaceReserva && userQueHaceReserva[0].name}/>
                            </div>
                            <div>
                                <h4>{userQueHaceReserva && userQueHaceReserva[0].name}</h4>
                                <p className="textos__grey">Depósito - {props.recepcionReserva.dropOff}</p>
                                <p className="textos__grey">Recogida - {props.recepcionReserva.pickUp}</p>
                            </div>
                            <div className="c-user__info">
                            <Link  to={`/chat?name=${user.name}&&room=${room}`}>
                            <button className="orangebtn" type="submit">Aceptar</button>
                            </Link>
                                <button className="orangebtn">Declinar</button>
                                
                            </div>
                        </div>
    )
}

export default BookingSmall
