import React, { useContext } from 'react'
import { useForm } from 'react-hook-form';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import { NavLink } from 'react-router-dom';
import '../../../index.scss';
import { UserContext } from '../../../contexts/UserContext';
import { LockerContext } from '../../../contexts/LockerContext';

const baseUrl2 = "http://localhost:3001/usuarios";
const lockersUrl = "http://localhost:3001/lockers";
const bookingUrl = "http://localhost:3001/booking";
const baseUrl= "https://meleteo.herokuapp.com/user/login";

export default function Login() {

    const { register, handleSubmit, errors } = useForm();

    const history = useHistory();

    let { setUser } = useContext(UserContext);
    let { setLocker } = useContext(LockerContext);

    const iniciarSesion = (data) => {
        const getToken = axios.get(bookingUrl, {email: data.email, password: data.password});
        const getUsers = axios.get(baseUrl2, { params: { email: data.email, password: data.password } });
        const getLocker = axios.get(lockersUrl, { params: { email: data.email } });
        
        axios.all([getToken, getUsers, getLocker])
            .then(axios.spread((...allData) => {
                console.log(allData);
                const tokenData = allData[0].data;
                const userData = allData[1].data;
                const lockerData = allData[2].data;
                if (tokenData.token === undefined) {//userData.token !== undefined
                    localStorage.setItem('token', tokenData.token)
                    setUser(userData[0]);
                    setLocker(lockerData);
                    sessionStorage.clear();//PROVISIONAL
                    sessionStorage.setItem('user', JSON.stringify(userData));//PROVISIONAL
                    sessionStorage.setItem('locker', JSON.stringify(lockerData));//PROVISIONAL
                    history.push('/home')
                } else {
                    alert('El email o contraseña no son correctos.')
                }

            }))

    }

    const respuestaGoogle = (respuesta) => {
        // cookies.set('email', respuesta.profileObj.email, { path: "/" });
        // cookies.set('name', respuesta.profileObj.name, { path: "/" });
        // cookies.set('userImg', respuesta.profileObj.imageUrl, { path: "/" });

        // alert('Bienvenido ' + respuesta.profileObj.name);
        // history.push('/home')
    }
    const respuestaFacebook = (respuesta) => {
        // cookies.set('email', respuesta.email, { path: "/" });
        // cookies.set('name', respuesta.name, { path: "/" });
        // cookies.set('userImg', respuesta.picture.data.url, { path: "/" });
        // alert('Bienvenido ' + respuesta.name);
        // history.push('/home')
    }

    return (

        <div className="container__main">

            <nav className="c-menu">
                <ul className="c-menu__list">
                    <li>
                        <NavLink className="c-menu__link" activeClassName="c-menu__link--active" to="/login">Iniciar sesión</NavLink>
                    </li>
                    <li>
                        <NavLink className="c-menu__link" activeClassName="c-menu__link--active" to="/registro">Regístrate</NavLink>
                    </li>
                </ul>
            </nav>

            <div className="login__container">


                <h4 >Inicia sesión ahora</h4>

                <div className="media__container">
                    <FacebookLogin className="media__btn"
                        appId="870628097080824"
                        autoLoad={false}
                        fields="name,email,picture"
                        callback={respuestaFacebook}
                        textButton="Facebook"
                        icon="fa-facebook" />
                    <GoogleLogin className="media__btn"
                        clientId="800471434710-orutqis98h56kvp7m4ms39pgj3ncls7r.apps.googleusercontent.com"
                        buttonText="Google"
                        onSuccess={respuestaGoogle}
                        onFailure={respuestaGoogle}
                        cookiePolicy={'single_host_origin'} />
                </div>

                <p className="textos__grey">o utiliza tu correo electrónico</p>

                <div >
                    <form className="login__form" onSubmit={handleSubmit(iniciarSesion)}>
                        <label htmlFor="email" className="login__label">
                            <span className="login__text">Dirección de correo electrónico</span>
                            <input className="login__input" type="email" name="email" id="email" ref={register({ required: true, pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/ })} />
                            {errors.email && <span className="login__warning">Introduce un e-mail válido</span>}
                        </label>

                        <label htmlFor="password" className="login__label">
                            <span className="login__text">Contraseña</span>
                            <input className="login__input" type="password" name="password" id="password" ref={register({ required: true })} />
                            {errors.password && <span className="login__warning">Tu contraseña debe contener al menos 8 caracteres, una minúscula y una mayúscula</span>}
                        </label>

                        <input className="orangebtn" value="Inicia sesión" type="submit" />

                    </form>
                </div>
            </div>
        </div>

    )
}
