import React, { useContext, useState } from 'react';
import { Link } from "react-router-dom";
import {UserContext} from '../../../contexts/UserContext';


import './Join.css';
import maleta from '../../../assets/icons/maleta2.png';
import titulomaleta from '../../../assets/icons/maleteo.png';


export default function SignIn() {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');


  let {user} = useContext(UserContext); 
  var roomjoin = 'Maleteo';

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
      <img src={titulomaleta} alt="maleteo"/>
        <img src={maleta} alt="maleta"/>
        <div>
          <input placeholder="Nombre" className="joinInput" type="text" onChange={(event) => setName(event.target.value)} />
        </div>
        
        <Link onClick={e => (!name) ? e.preventDefault() : null} to={`/sala?name=${user[0].name}&&room=${roomjoin}`}>
          <button className={'button mt-20'} type="submit">Entrar</button>
        </Link>
      </div>
    </div>
  );
}
