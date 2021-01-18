import React from 'react'
import FormData from 'form-data';
import { useForm } from 'react-hook-form';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const baseUrl2 = "http://localhost:3001/usuarios";
const baseUrl= "http://localhost:5500/user/register";
// const baseUrl= "https://meleteo.herokuapp.com/user/register";

export default function Registro() {

    const { register, handleSubmit, errors } = useForm();

    const history = useHistory();

    const registrarse = (data) => {
        // const formData = new FormData();
        // formData.append("email", data.email);
        // formData.append("name", data.name);
        // formData.append("age", data.age);
        // formData.append("subscription", data.subscription);
        // formData.append("password", data.password);

        // formData.append("image", data.image[0], data.image[0].name);

        axios.post(baseUrl2, {//ESTA PARTE DEL CÓDIGO LA HE PUESTO YO AHORA, DARÍO
            "email": data.email,
            "name": data.name,
            "image": data.image,
            "age": data.age,
            "subscription": data.subscription,
            "password": data.password
        })
        .then(response => {
            history.push('/login');
            return response.data;

        })
    }
    //     axios.post(baseUrl, formData, {
    //         headers: {
    //             'accept': 'application/json',
    //             'Accept-Language': 'en-US,en;q=0.8',
    //             'Content-Type': 'multipart/form-data',
    //         }
    //     })
    //         .then(response => {
    //             history.push('/login');
    //             return response.data;

    //         })
    //         .catch(error => {
    //             console.log('no entiendo');
    //             console.log(error);
    //         })
    // }

    const respuestaGoogle = (respuesta) => {
        console.log(respuesta);
    }
    const respuestaFacebook = (respuesta) => {
        console.log(respuesta);
        axios.post(baseUrl, {
            "email": respuesta.email,
            "name": respuesta.name,
            "image": respuesta.picture.data.url,
            "age": respuesta.age ? respuesta.age : "1999-04-04",
            "subscription": respuesta.subscription ? respuesta.subscription : true
        })
            .then(response => {
                history.push('/login');
                return response.respuesta;

            })
            .catch(error => {
                console.log(error);
            })
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

                <h4>Únete a Maleteo y disfruta de sus ventajas</h4>

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

                <div>
                    <form className="login__form" onSubmit={handleSubmit(registrarse)}>
                        <label htmlFor="email" className="login__label">
                            <span className="login__text">Dirección de correo electrónico</span>
                            <input className="login__input" type="email" name="email" id="email" ref={register({ required: true })} />
                            {errors.email && <span className="login__warning">Introduce un e-mail válido</span>}
                        </label>

                        <label htmlFor="name" className="login__label">
                            <span className="login__text">Nombre</span>
                            <input className="login__input" type="text" name="name" id="name" ref={register({ required: true })} />
                            {errors.name && <span>Obligatorio</span>}
                        </label>

                        <label htmlFor="image" className="login__label">
                            <span className="login__text">Foto</span>
                            <input className="login__input" type="text" name="image" id="image" ref={register} placeholder="Ponga aquí su enlace a la foto" />
                        </label>

                        <label htmlFor="password" className="login__label">
                            <span className="login__text">Contraseña</span>
                            <input className="login__input" type="password" name="password" id="password" ref={register({ required: true })} />
                            {errors.password && <span>Tu contraseña debe contener al menos 8 caracteres, una minúscula y una mayúscula</span>}
                        </label>

                        <label htmlFor="age" className="login__label">
                            <span className="login__text">Fecha de nacimiento</span>
                            <input className="login__input" type="date" name="age" id="age" ref={register({ required: true })}
                                placeholder="Para registrarte tendrás que ser mayor de edad. Los usuarios no verán tu fecha de cumpleaños"
                            />
                            {errors.age && <span>Tienes que ser mayor de edad para registrarte</span>}
                        </label>

                        <label htmlFor="subscription" className="login__label">
                            <input type="checkbox" name="subscription" id="subscription" ref={register} />
                            <span className="login__text-small">  Quiero recibir consejos sobre cómo gestionar mi equipaje, ofertas, novedades y otros correos electrónicos de Maleteo</span>
                        </label>

                        <input className="orangebtn" value="Registrarse" type="submit" />
                    </form>
                </div>
            </div>
        </div >
    )
}
