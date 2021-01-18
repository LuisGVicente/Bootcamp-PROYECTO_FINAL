import React from 'react';
import { Link } from 'react-router-dom';
import nextIcon from '../../../../assets/icons/next.png';


export default function LockerSmall(props) {

    return (
            <div className="locker-container-small">
                <h6 >{props.locker.name}</h6>
                <p className="textos__grey">Anuncio completado al 100%</p>
                <div className="locker-container-small__img">
                    <img className="locker-container-small__photo" src={props.locker.image} alt={props.locker.image}/><Link to={"/locker/"+props.locker.id}><img className="locker-container-small__next"src={nextIcon} alt="nextIcon"/></Link>
                </div>
            </div>
    )
}