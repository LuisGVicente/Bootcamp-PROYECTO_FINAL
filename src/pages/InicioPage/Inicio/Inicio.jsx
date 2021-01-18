import React from 'react';
import { Link } from 'react-router-dom';
import './Inicio.scss';
import maleta from '../../../assets/icons/maleta2.png';
import titulomaleta from '../../../assets/icons/maleteo.png';

export default function Inicio(props) {


    return (
        <>
          <Link to='/login'>
            <div className="joinOuterContainer">
              <div className="joinInnerContainer">
              <img src={titulomaleta} alt="maleteo"/>
                <img src={maleta} alt="maleta"/>
              </div>
            </div>
          </Link>
        </>
    )
}