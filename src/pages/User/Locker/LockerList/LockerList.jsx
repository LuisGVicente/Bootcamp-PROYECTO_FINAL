import React, { useContext, useEffect, useState} from 'react'
import { Link } from 'react-router-dom';
import backIcon from '../../../../assets/icons/back@2x.png';
import addPlusIcon from '../../../../assets/icons/add-plus.png';
import blanco from '../../../../assets/img/blanco.jpg';
import Menu from '../../../../core/Menu/Menu';
import {UserContext} from '../../../../contexts/UserContext';
import axios from 'axios';
import LockerSmall from '../LockerSmall/LockerSmall';

const lockersUrl = "http://localhost:3001/lockers";
// const lockersUrl= "https://meleteo.herokuapp.com/user/profile/locker";

export default function LockerList(props) {

    let {user} = useContext(UserContext);
    let [locker, setLocker] = useState();

    if (user === null) {
        let userSessionStorage = JSON.parse(sessionStorage.getItem('user'));
        user = userSessionStorage[0];
    }    

    useEffect(() => {
        axios.get(lockersUrl, { params: { email: user.email } }).then(res => {
            setLocker(res.data);
        })
    }, [])


    return (
        <>
        <div className="container__main">
            <Link to='/user'><img src={backIcon} alt="backIcon"/></Link>
            <h3 className="titulo">Tus anuncios </h3>

            {locker && locker.map((lock) => {
                return <LockerSmall locker={lock} key={lock.id}></LockerSmall>
            })}
            

            <div className="locker-container-small">
                <h6>Añade otro espacio</h6>
                <div className="locker-container-small__img">
                    <img className="locker-container-small__photo" src={blanco} alt="blanco"/><Link to='/lockeredit'>< img className="locker-container-small__next" src={addPlusIcon} alt="addIcon"/></Link>
                </div>
            </div>
            <div style={{height:"80px"}}></div>
        </div>
        <Menu></Menu>
        </>
    )
}
