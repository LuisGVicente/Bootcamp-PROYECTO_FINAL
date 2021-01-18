import React, { useContext, useEffect, useState } from 'react';
import backIcon from '../../../assets/icons/back@2x.png';
import { Link, useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import {LockerContext} from '../../../contexts/LockerContext';
import Menu from '../../../core/Menu/Menu';
import './BookingResume.scss';

const lockersUrl = "http://localhost:3001/lockers";
const bookingUrl = "http://localhost:3001/booking";
const baseUrl2 = "http://localhost:3001/usuarios";

export default function BookingResume(props) {

    const history = useHistory();
    const {lockerDetail} = useParams();
    let [bookingLocker, setBookingLocker] = useState();
    let [bookingUser, setBookingUser] = useState();
    const {locker} = useContext(LockerContext);
    let user = JSON.parse(sessionStorage.getItem('user'))[0];

    useEffect(() => {
        axios.get(lockersUrl, { params: { id: lockerDetail } }).then(res => {
            let paramLocker = res.data[0].user;
            setBookingLocker(res.data[0]);
        paramLocker && axios.get(baseUrl2, { params: { name: paramLocker } }).then(res => {
            setBookingUser(res.data[0]);
            })
        })
        
        
    }, [])

    const calcDias = (dropOff,pickUp) => {
        let dropoffDate = new Date(dropOff);
        let pickUpDate = new Date(pickUp);
        let difMili = pickUpDate.getTime() - dropoffDate.getTime();
        let dia = 1000*60*60*24;
        let dif = difMili/dia;
        return Math.ceil(dif);
    }

    const tarifa1dia = 6;
    const tarifaSiguientesDias = 4;
    const gastosGestion = 2;
    const dias = locker && calcDias(locker.dropOff,locker.pickUp);

    const total = (dias) => {
        if (dias <= 1) {
            return locker && tarifa1dia * locker.bags + gastosGestion
        } else {
            return tarifa1dia * locker.bags + tarifaSiguientesDias*(dias-1)*locker.bags + gastosGestion
        }
        
    }

    const completarReserva = () => {
        axios.post(bookingUrl,{
            "dropOff": locker.dropOff, 
            "pickUp": locker.pickUp, 
            "bags": locker.bags, 
            "lockerID": bookingLocker.id, 
            "userID": user.id, 
            "guardianID": bookingUser.id, 
            "confirmed": false,
            "days": dias,
            "rate": total(dias)
        })
        .then(response => {
            history.push('/bookingComplete');
            console.log(response);
            return response.data;

        })
        .catch(error => {
            console.log(error);
        })

    }


    return (
        <div>
            <div >
                <div className="container__orange-top">
                    <Link to={bookingLocker && '/booking/'+ bookingLocker.id}><img  src={backIcon} alt="backIcon" /></Link>
                    <div className="titulo"><h4>Detalles de tu reserva</h4></div>
                </div>

                <table id="llegadas">
                    <tr>
                        <th>Llegada</th>
                        <th>Recogida</th>
                        <th>{locker && locker.bags > 1 ? "Equipajes: " : "Equipaje: "}</th>
                    </tr>
                    <tr>
                        <td>{locker && locker.dropOff}</td>
                        <td>{locker && locker.pickUp}</td>
                        <td>{locker && locker.bags}</td>
                    </tr>
                </table>

                <table id="datosllegada">
                    <tbody>
                        <tr>
                            <td>Primeras 24 horas</td>
                            <td> </td>
                        </tr>
                        <tr>
                            <td>{tarifa1dia} x {locker && locker.bags} {locker && locker.bags > 1 ? "equipajes" : "equipaje"} </td>
                            <td>{locker && tarifa1dia*locker.bags} $ </td>
                        </tr>
                        {dias > 1 && <tr>
                            <td>Siguientes días: {dias-1} </td>
                            <td> </td>
                        </tr>}
                        {dias > 1 && <tr>
                            <td>{tarifaSiguientesDias} x {locker && locker.bags} {locker && locker.bags > 1 ? "equipajes" : "equipaje"} </td>
                            <td>{tarifaSiguientesDias*locker.bags*(dias-1)} $ </td>
                        </tr>}
                        <tr>
                            <td> Gastos de gestión</td>
                            <td>{gastosGestion} $ </td>
                        </tr>
                        <tr>
                            <td>Seguro hasta 1000 $ </td>
                            <td>Gratis </td>
                        </tr>
                        <tr>
                            <td>Total </td>
                            <td>{total(dias)} $ </td>
                        </tr>
                    </tbody>
                </table>

                    <input onClick={()=>completarReserva()} className="orangebtn" value="Reservar" type="submit" />
            </div>

            <Menu></Menu>
        </div>
    )
}


