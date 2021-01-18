import React, { useContext } from 'react';
import Menu from '../../core/Menu/Menu';
import '../../index.scss';
import lupaIcon from '../../assets/icons/lupa@2x.png';
import calendarIcon from '../../assets/icons/calendario@2x.png';
import bagIcon from '../../assets/icons/maletita.png';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {LockerContext} from '../../contexts/LockerContext';


export default function HomePage(props) {
    

    const history = useHistory();
    const { register, handleSubmit } = useForm();
    let {setLocker} = useContext(LockerContext);

    const buscarLockers = (data) => {
        setLocker(data);
        history.push('/maps');
    }

    return (
        <>
                <div className="container-fluid">
                    <div className="row mt-2">
                        <div className="col-12">
                            <h3>Encuentra tu guardian</h3>
                        </div>
                        <div className="col-12">
                            <form _lpchecked="1" onSubmit={handleSubmit(buscarLockers)}>

                                    <div className="row mb-2">
                                        <div className="col-sm-12">
                                            <div className="input-group">
                                                <label htmlFor="location"></label>
                                                <div className="input-group-prepend">
                                                    <div className="input-group-text text-primary bg-white border-right-0">
                                                        <img src={lupaIcon} alt="lupaIcon"/>
                                                    </div>
                                                </div>
                                                <select ref={register} id="location"  className="form-control border-left-0" name="location" placeholder="Introduce dirección">
                                                    <option></option>
                                                    <option>Madrid</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row mb-2">
                                        <div className="col-6">
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <div className="input-group-text text-primary bg-white border-right-0">
                                                        <img src={calendarIcon} alt="calendarIcon"/>
                                                    </div>
                                                </div>
                                                <span className="login__text">De</span>
                                                <input className="form-control border-left-0" type="datetime-local" name="dropOff" id="dropOff" placeholder="Hora de entrada" ref={register({ required: true })} />
                                            </div>
                                        </div>

                                        <div className="col-6">
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <div className="input-group-text text-primary bg-white border-right-0">
                                                        <img src={calendarIcon} alt="calendarIcon"/>
                                                    </div>
                                                </div>
                                                <span className="login__text">A</span>
                                                <input className="form-control border-left-0" type="datetime-local" name="pickUp" id="pickUp" placeholder="Hora de recogida" ref={register({ required: true })} />
                                            </div>
                                        </div>

                                        <div className="col-6">
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <div className="input-group-text text-primary bg-white border-right-0">
                                                        <img src={bagIcon} alt="bagIcon"/>
                                                    </div>
                                                </div>
                                                <input ref={register({ required: true })}id="bags" type="number" className="form-control border-left-0" name="bags" placeholder="Nº de piezas"/>
                                            </div>
                                        </div>

                                    </div>
                                    <input  className="orangebtn" value="Buscar" type="submit"/>
                            </form>
                        </div>
                    </div>
                                                
                    <div className="row mt-2">
                        <div className="col-12">
                                <h3>Novedades</h3>
                            <div className="row display-flex">
                                <div className="col-md-2">
                                    <div className="card text-white" id="article-card" >
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-3">
                                                        


                                                </div>
                                                <div className="col-9">
                                                    <h5 className="card-title">Titulo primero</h5>
                                                    <p className="card-text">Primer artículo de prueba para probar el sistema de blog de maleteo.</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <hr className="article-divider"/>
                                                <p>Leer mas...</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-2">
                                    <div className="card text-white" id="article-card" >
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-3">
                                                        


                                                    </div>
                                                    <div className="col-9">
                                                        <h5 className="card-title">Titulo segundo</h5>
                                                        <p className="card-text">Segundo artículo de prueba para probar el sistema de blog de maleteo, realizado en local.</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-body">
                                                <hr className="article-divider"/>
                                                <p>Leer mas...</p>
                                            </div>
                                    </div>
                                </div>
                                <div className="col-md-2">
                                        <div className="card text-white" id="article-card" >
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-3">
                                                      


                                                    </div>
                                                    <div className="col-9">
                                                        <h5 className="card-title">Una nueva página</h5>
                                                        <p className="card-text">Tercer artículo de prueba para probar el sistema de blog de maleteo, realizado en local.</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-body">
                                                <hr className="article-divider"/>
                                                <p>Leer mas...</p>
                                            </div>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            <Menu></Menu>
        </>
    )
}

