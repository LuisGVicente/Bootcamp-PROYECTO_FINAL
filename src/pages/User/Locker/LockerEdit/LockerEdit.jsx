import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useHistory } from 'react-router-dom';
import backIcon from '../../../../assets/icons/back@3x.png';
import axios from 'axios';
import {UserContext} from '../../../../contexts/UserContext';

const lockersUrl = "http://localhost:3001/lockers";

export default function LockerEdit(props) {

    const { register, handleSubmit, errors } = useForm();
    let {user} = useContext(UserContext);
    if (user === null) {
        let userSessionStorage = JSON.parse(sessionStorage.getItem('user'));
        user = userSessionStorage[0];
    }
    const history = useHistory();

    const onSubmit = (data) => {
        console.log(data);
        axios.post(lockersUrl, {
            "image": data.image,
            "name": data.name,
            "location": data.location,
            "locker_TypeA": data.locker_TypeA,
            "locker_TypeB": data.locker_TypeB,
            "startTime": data.startTime,
            "endTime": data.endTime,
            "available_Space": data.available_Space,
            "description": data.description,
            "user": user.name,
            "email": user.email
        })
            .then(response => {
                history.push('/user');
                console.log(response);
                return response.data;

            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <div>
            <div className="container__orange-top">
                <Link to='/lockerlist'><img src={backIcon} alt="backIcon" /></Link>
                <div className="titulo"><h4>Configura tu espacio en muy pocos pasos</h4></div>
            </div>
            <div className="container__main">
                <form className="login__form" onSubmit={handleSubmit(onSubmit)}>
                    <label className="login__input" htmlFor="locker_TypeA">
                        <span className="login__text">Tipo de propiedad</span>{errors.locker_TypeA && <span>Obligatorio</span>}
                        <select className="login__input" id="locker_TypeA" name="locker_TypeA" ref={register({ required: true })}>
                            <option value="casa">Casa</option>
                            <option value="hotel">Hotel</option>
                            <option value="establecimiento">Establecimiento</option>
                        </select>
                    </label>

                    <label className="login__input" htmlFor="locker_TypeB">
                        <span className="login__text">Tipo de espacio</span>{errors.locker_TypeB && <span>Obligatorio</span>}
                        <select className="login__input" id="locker_TypeB" name="locker_TypeB" ref={register({ required: true })}>
                            <option value="habitacion">Habitación</option>
                            <option value="hall">Hall</option>
                            <option value="trastero">Trastero</option>
                            <option value="buhardilla">Buhardilla</option>
                            <option value="garaje">Garaje</option>
                        </select>
                    </label>

                    <label className="login__input" htmlFor="location">
                        <span className="login__text">Ubicación</span>{errors.location && <span>Obligatorio</span>}
                        <input className="login__input" type="text" name="location" id="location" ref={register({ required: true })} />
                    </label>

                    <label className="login__input" htmlFor="name">
                        <span className="login__text">Título</span>{errors.guaridaName && <span>Obligatorio</span>}
                        <input className="login__input" type="text" name="name" id="name" ref={register({ required: true })} />
                    </label>

                    <label className="login__input" htmlFor="description">
                        <span className="login__text">Descripción</span>{errors.description && <span>Obligatorio</span>}
                        <input className="login__input" type="textarea" name="description" id="description" ref={register({ required: true })} />
                    </label>

                    <label htmlFor="startTime">
                        <span className="login__text">Desde</span>{errors.startTime && <span>Obligatorio</span>}
                        <input className="login__input" type="time" name="startTime" id="startTime" ref={register({ required: true })} />
                    </label>

                    <label  htmlFor="endTime">
                        <span className="login__text">Hasta</span>{errors.endTime && <span>Obligatorio</span>}
                        <input className="login__input" type="time" name="endTime" id="endTime" ref={register({ required: true })} />
                    </label>

                    <label htmlFor="available_Space">
                        <span className="login__text"> Maletas disponibles</span>{errors.available_Space && <span>Obligatorio</span>}
                        <input className="login__input" type="number" name="available_Space" id="available_Space" ref={register({ required: true })} />
                    </label>

                    <label  htmlFor="image">
                        <span className="login__text">Fotos</span>
                        <input className="login__input" type="text" name="image" id="image" ref={register({ required: true })} />
                    </label>

                    <input className="orangebtn" value="Añadir espacio" type="submit" />
                </form>
            </div>

        </div>
    )
}
