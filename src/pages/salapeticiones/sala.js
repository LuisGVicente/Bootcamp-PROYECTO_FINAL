import React, { useState, useEffect, useContext } from "react";
import Request from './request/request';
import queryString from 'query-string';
import io from "socket.io-client";
import './sala.css'
import { Link } from "react-router-dom";
import fotoperfil from '../../assets/icons/fotoperfil.png';
import { UserContext } from '../../contexts/UserContext';


export default function Sala() {

    var {user} = useContext(UserContext);
    var room = 'maleteo';

    return (
        <div className="exterior">
        <div className="containerRoom">   
        
            <div className="containerTitle">
            <h1>Petición de reserva </h1>
                <div className="post">
                <img src={fotoperfil} alt="fotoperfil" />
                <h2>{user.name}</h2>
                <Link  to={`/chat?name=${user.name}&&room=${room}`}>
          <button className="botonsala" type="submit">Aceptar</button>
        </Link>
                </div>
                
                
            </div>
            </div>
        </div>
    )

}
