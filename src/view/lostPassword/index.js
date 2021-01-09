import { React, useState } from 'react';
import './lostPassword.css';
//import { Link } from 'react-router-dom';
import firebase from '../../config/firebase';
import 'firebase/auth';
import Navbar from '../../components/navbar';
//import { useSelector, useDispatch } from 'react-redux';

function LostPassword() {

    const [email, setEmail] = useState();//controla o estado da aplicação
    const [msg, setMsg] = useState();

    function recoveryPassword() {
        firebase.auth().sendPasswordResetEmail(email).then(resultado => {
            setMsg('Um email foi enviado para a sua caixa de entrada.')
        }).catch(error => {
            setMsg('Por favor insira um email válido!')
        })
    }

    return (
        <>
            <Navbar></Navbar>
            <div>
                <form className="text-center text-white font-weight-bold form-lostPassword mx-auto mt-5">
                    <h1>Recuperação de senha.</h1>
                    <input onChange={e => setEmail(e.target.value)} className="form-control my-4 mb-3" type="email" placeholder="Digite o seu email"></input>
                    <div className="msg my-8 mb-3">
                        <span>
                            {msg}
                        </span>
                    </div>
                    <button onClick = {recoveryPassword} className="btn btn-lg btn-block btn-enviar text-white" type="button">Recuperar a senha</button>
                </form>
            </div>
        </>

    )
}

export default LostPassword;