import React, { useState } from 'react';
import './login.css';
import firebase from '../../config/firebase'
import 'firebase/auth'
import { Link, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

function Login() {

    const [email, setEmail] = useState();//controla o estado da aplicação
    const [senha, setSenha] = useState();
    const [msgType, setMsgType] = useState();
    const [carregando, setCarregando] = useState();
    const dispatch = useDispatch();//persiste dados no storage


    //autenticacão dos usuáriios
    function autenticar() {

        setMsgType(null);

        if (!email || !senha) {
            setMsgType('erro')
        }

        //espera o retorno do firebase utilizando o login padrao, e se estiver tudo certo ele altera o tipo da mensagem
        //para ok, liga o botao de carregamento e grava os dados de usuario logado no store1'
        firebase.auth().signInWithEmailAndPassword(email, senha).then(resultado => {

            setMsgType('ok')
            setCarregando(1)
            setTimeout(() => {
                dispatch({ type: 'LOGIN', usuarioEmail: email })//grava os dados
            }, 2000);


        }).catch(erro => {

            setMsgType('erro')
            setCarregando(0);
        });

    }



    return (
        <div className="login-content d-flex align-itens-center">

            {
                useSelector(state => state.usuarioLogado) === true ? <Redirect to="/"></Redirect> : null //se o usuario estiver logado então me redirecione para o home

            }
            <form className="form-signin mx-auto text-center">
                <div className="text-center mb-4">
                    <i className="fas fa-book-reader text-white fa-9x mb-3"></i>
                    <h1 className="h3 mb-3 font-weight-normal text-white font-weight-bold">Login</h1>
                </div>

                <input onChange={(e) => setEmail(e.target.value)} type="email" id="inputEmail" className="form-control my-2" placeholder="Digite o seu email:" />
                <input onChange={(e) => setSenha(e.target.value)} type="password" id="inputPassword" className="form-control my-2" placeholder="Senha:" />
                {
                    carregando ? <div class="text-center spinner-border text-primary mt-3" role="status"><span class="sr-only">Carregando...</span></div>
                        : <button className="btn btn-lg btn-login btn-block my-2" onClick={autenticar} type="button">Entrar...</button>
                }


                <div className="text-white text-center my-5">
                    {
                        msgType === 'ok' && <span><strong> Uau! </strong> Você se conectou ao sistema &#128571;</span>
                    }

                    {
                        msgType === 'erro' && <span><strong> Eita! </strong> Senha ou email inválidos! &#128575;</span>
                    }
                </div>

                <div className="option-login mt-5 text-center">
                    <Link to="/lostpassword" className="mx-2" > Recuperar a senha </Link>
                    <span>&#9827;</span>
                    <Link to='newUser' className="mx-2" > Quero me cadastrar </Link>
                </div>
            </form>
        </div>
    );
}

export default Login;