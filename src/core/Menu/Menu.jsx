import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import homeIcon from '../../assets/icons/inicio@2x.png';
import searchIcon from '../../assets/icons/buscar@2x.png';
import chatIcon from '../../assets/icons/mensaje@2x.png';
import chatAlert2Icon from '../../assets/icons/mensaje@2x-alert2.png';
import userIcon from '../../assets/icons/usuario@2x.png';
import {UserContext} from '../../contexts/UserContext';
import axios from 'axios';

const bookingUrl = "http://localhost:3001/booking";

export default function Menu() {

    let [peticionReserva, setPeticionReserva] = useState();
    let [recepcionReserva, setRecepcionReserva] = useState();

    let {user} = useContext(UserContext);
    if (user === null) {
        let userSessionStorage = JSON.parse(sessionStorage.getItem('user'));
        user = userSessionStorage[0];
    }

    useEffect(() => {
        axios.get(bookingUrl, { params: { guardianID: user.id } }).then(res => {
            setRecepcionReserva(res.data);
        })
        axios.get(bookingUrl, { params: { userID: user.id } }).then(res => {
            setPeticionReserva(res.data);
        })

    }, [])
    
    

    return (
        <nav className="b-menu">
        <ul className="b-menu__list">
            <li>
                <NavLink className="b-menu__link" activeClassName="b-menu__link--active" to="/home"><img src={homeIcon} alt="homeIcon"/></NavLink>
            </li>
            <li>
                <NavLink className="b-menu__link" activeClassName="b-menu__link--active" to="/maps"><img src={searchIcon} alt="searchIcon"/></NavLink>
            </li>
            <li>
                <NavLink className="b-menu__link" activeClassName="b-menu__link--active" to="/bookingPeticion"><img src={recepcionReserva && recepcionReserva[0] ? chatAlert2Icon : chatIcon} alt="chatIcon"/></NavLink>
            </li>
            <li>
                <NavLink className="b-menu__link" activeClassName="b-menu__link--active" to="/user"><img src={userIcon} alt="userIcon"/></NavLink>
            </li>
        </ul>
    </nav>
    )
}
