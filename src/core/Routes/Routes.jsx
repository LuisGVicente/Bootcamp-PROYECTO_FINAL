import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from '../../pages/Home/HomePage';
import Inicio from '../../pages/InicioPage/Inicio/Inicio';
import Login from '../../pages/InicioPage/Login/Login';
import Registro from '../../pages/InicioPage/Registro/Registro';
import User from '../../pages/User/User/User';
import LockerList from '../../pages/User/Locker/LockerList/LockerList'
import LockerEdit from '../../pages/User/Locker/LockerEdit/LockerEdit'
import Locker from '../../pages/User/Locker/Locker/Locker'
import {UserProvider} from '../../contexts/UserContext'
import {LockerProvider} from '../../contexts/LockerContext'
import Chat from '../../pages/ChatPage/Chat/Chat';
import Join from '../../pages/ChatPage/Join/Join';
import Sala from '../../pages/salapeticiones/sala';
import Map from '../../shared/Map/Map'
import Maps from '../../shared/Maps/Maps'
import Maplist from '../../shared/Maplist/Maplist';
import BookingResume from '../../pages/Booking/BookingResume/BookingResume';
import BookingComplete from '../../pages/Booking/BookingComplete/BookingComplete';
import BookingPeticion from '../../pages/Booking/BookingPeticion/BookingPeticion';

export default function Routes(props) {
    

    return (
        <Switch>
            <UserProvider>
            <LockerProvider>

            <Route path="/join" exact component={Join} />
            <Route path="/chat" component={Chat} />
            <Route path="/sala" component={Sala} />

            <Route path="/maps">
                <Maps/>
            </Route>

            <Route path="/map">
                <Map/>
            </Route>

            <Route path="/bookingPeticion">
                <BookingPeticion/>
            </Route>

            <Route path="/bookingComplete">
                <BookingComplete/>
            </Route>

            <Route path="/bookingConfirmation/:lockerDetail">
                <BookingResume/>
            </Route>

            <Route path="/booking/:lockerDetail">
                <Locker page="booking"/>
            </Route>

            <Route path="/lockeredit">
                <LockerEdit/>
            </Route>

            <Route path="/lockerlist">
                <LockerList/>
            </Route>

            <Route path="/locker/:lockerDetail">
                <Locker/>
            </Route>

            <Route path="/user">
                <User/>
            </Route>

            <Route path="/chat">
                <Chat/>
            </Route>

            <Route path="/maplist">
                <Maplist/>
            </Route>

            <Route path="/map">
                <Map/>
            </Route>
            
            <Route path="/home">
                <HomePage/>
            </Route>

            <Route path="/login">
                <Login/>
            </Route>

            <Route path="/registro">
                <Registro/>
            </Route>
            
            <Route path="/inicio">
                <Inicio/>
            </Route>

            </LockerProvider>
            </UserProvider>




        </Switch>
    )
}
