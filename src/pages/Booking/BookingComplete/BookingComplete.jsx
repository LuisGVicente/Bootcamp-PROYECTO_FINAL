import React from 'react';
import { Link } from 'react-router-dom';
import closeIcon from '../../../assets/icons/closeIcon.png';
import fenixIcon from '../../../assets/icons/fenix@3x.png';
import Menu from '../../../core/Menu/Menu';
import './BookingComplete.scss';
export default function BookingComplete(props) {


    return (
        <div>
            <div>
                <div className="container__orange-top">
                    <Link to='user'><img  src={closeIcon} alt="closeIcon" /></Link>
                    <div className="titulo"><h4>Reserva completada</h4></div>
                </div>
                <div id="logo">
                    <img src={fenixIcon} alt="fenixIcon"/>
                </div>
                <div id="textologo">
                    <h2>BE FREE!</h2>
                    <p>Contacta ya con tu guardian y espera a que acepte tu reserva</p>
                </div>
            </div>
            <Menu></Menu>
        </div>
    )
}