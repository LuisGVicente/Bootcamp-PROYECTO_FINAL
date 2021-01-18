import React, { useContext } from 'react'
import Menu from '../../../core/Menu/Menu';
import defaultImg from '../../../assets/img/world@2x.png';
import { Link } from 'react-router-dom';
import {UserContext} from '../../../contexts/UserContext';
import './User.scss';

export default function User(props) {
    
    
    let {user} = useContext(UserContext);

    if (user === null) {
        user = JSON.parse(sessionStorage.getItem('user'))[0];
        }
    
    return (
        <>
        <div className="c-user container__main">
            <div className="c-user__header">
                <div>
                    <h3>{user.name}</h3>
                    <span>Puedes ver y editar tu perfil</span>
                </div>
                <img className="c-user__img" src = {user.image ? user.image : defaultImg} alt="userImg"/>
            </div>
            <div className="c-user__info">
                <Link className="c-user__link" to='/lockerlist'><h6>Conviérte en Guardián</h6></Link>   
                <p className="textos__grey">Puedes ganar 400$ de media al mes</p>
            </div>
            <div className="c-user__info">
                <h6>Invita a tus amigos</h6>
                <p className="textos__grey">Y podrás ganar descuentos para ti</p>
            </div>
            <div className="c-user__info">
                <h6>Mis reservas</h6>
            </div>
            <div className="c-user__info">
            <Link className="c-user__link" to='/lockerlist'><h6>Tus anuncios</h6></Link>
            </div>
            <div className="c-user__info">
               <Link className="c-user__link" to={`/sala?name=${user.name}`}> <h6>Configuración (link provisional a sala)</h6></Link>
            </div>
            <div className="c-user__info">
            <Link className="c-user__link" to='/inicio' onClick={()=> sessionStorage.clear()}><h6>Cerrar Sesión</h6></Link>
            </div>
            
        </div>
        <Menu></Menu>
        </>
        
  
    )
}
