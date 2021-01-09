import React, { useState } from 'react';
import firebase from '../../config/firebase';
import 'firebase/auth';
import './newUser.css';
import Navbar from '../../components/navbar';


function NewUser() {

    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();
    const [msgType, setMsgType] = useState();
    const [msg, setMsg] = useState();
    const [carregando, setCarregando] = useState();

    function cadastrar() {
        setCarregando(1);
        setMsgType(null);

        if (!email || !senha) {
            setMsgType('erro')
            setMsg('Você não preencheu todos os campos!')
        }

        firebase.auth().createUserWithEmailAndPassword(email, senha).then(resultado => {
            setCarregando(0);
            setMsgType('ok')
        }).catch(erro => {
            setCarregando(0);
            setMsgType('erro')
            switch (erro.message) {
                case 'Password should be at least 6 characters':
                    setMsg('A senha deve ter pelo menos 6 caracteres.')
                    break;
                case 'The email address is already in use by another account.':
                    setMsg('Este email já está sendo usado por outra conta.')
                    break;

                case 'The email address is badly formatted.':
                    setMsg('O formato de email é inválido');
                    break;
                default:
                    setMsg('Não foi possível cadastrar, por favor, tente novamente mais tarde!');
                    break;
            }
        })
    }

    return (
        <>
        <Navbar></Navbar>
        <div className="forma-cadastro">
            <form className="text-center form-login mx-auto">
                <h1 className="h3 mb-3 text-white font-weight-bold">Cadastro de novo usuário</h1>
                <input onChange={(e) => setEmail(e.target.value)} type="email" className="form-control my-2" placeholder="Email"></input>
                <input onChange={(e) => setSenha(e.target.value)} type="password" className="form-control my-2" placeholder="Senha"></input>

                {
                    carregando ? <div class="spinner-border text-primary mt-2" role="status"><span class="sr-only">Carregando...</span></div>
                    :  <button onClick={cadastrar} type="button" className="btn btn-lg mt-3 mb-5 btn-cadastro">Cadastrar</button>
                }
                


              
                <div className="text-black text-center my-5">
                    {
                        msgType === 'ok' && <span><strong> Uau! </strong> Usuário cadastrado com sucesso! &#128571;</span>
                    }

                    {
                        msgType === 'erro' && <span><strong> Eita! </strong> {msg} &#128575;</span>
                    }
                </div>
            </form>

        </div>
        </>
    )
}

export default NewUser;