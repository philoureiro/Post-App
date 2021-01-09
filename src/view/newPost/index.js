import { React, useState, useEffect } from 'react';
import './newPost.css';
import { useSelector } from 'react-redux';
//import { Link } from 'react-router-dom';
import Navbar from '../../components/navbar';
import firebase from '../../config/firebase'

function NewPost({ match }) {
    const [msgType, setMsgType] = useState();
    const [titulo, setTitulo] = useState();
    const [tipo, setTipo] = useState();
    const [descricao, setDescricao] = useState();
    const [data, setData] = useState();
    const [horario, setHorario] = useState();
    const [imagem, setImagem] = useState();
    const usuarioEmail = useSelector(state => state.usuarioEmail);
    const [carregando, setCarregando] = useState(0);
    const [imagemNova, setImagemNova] = useState();
    const [imagemAtual, setImagemAtual] = useState();


    const db = firebase.firestore();
    const storage = firebase.storage();

    useEffect(() => {
        if (match.params.idPost) { //existe um paramentro na url???

            firebase.firestore().collection('posts').doc(match.params.idPost).get().then(resultado => {
                setTitulo(resultado.data().titulo);
                setTipo(resultado.data().tipo);
                setDescricao(resultado.data().descricao);
                setData(resultado.data().data);
                setHorario(resultado.data().horario);
                setImagemAtual(resultado.data().imagem);
            })
        }


    }, [carregando]); //somente quando o valor de carregando for alterado


    function atualizar() {
        setCarregando(true);
        setMsgType(null);

        if(imagemNova){
            storage.ref(`imagens/${imagemNova.name}`).put(imagemNova);
        }


        db.collection('posts').doc(match.params.idPost).update({
            titulo: titulo,
            descricao: descricao,
            data: data,
            horario: horario,
            tipo: tipo,
            imagem: imagemNova ? imagemNova.name : imagemAtual
        }).then(() => {
            setMsgType('ok');
            setCarregando(false);
        }).catch(erro => {
            setMsgType('erro');
            setCarregando(false);
        })
    }

    function cadastrar() {
        setCarregando(true)
        storage.ref(`imagens/${imagemNova.name}`).put(imagemNova).then(() => {
            db.collection('posts').add({
                titulo: titulo,
                descricao: descricao,
                data: data,
                horario: horario,
                tipo: tipo,
                imagem: imagemNova.name,
                publico: 1,
                criacao: new Date(),
                usuario: usuarioEmail,
                categoria: tipo,
                visualizacoes: 0,
            }).then(() => {
                setMsgType('ok');
                setCarregando(false);
            }).catch(() => {
                setMsgType('erro');
                setCarregando(false);
            })
        });
    }

    return (
        <>
            <Navbar></Navbar>

            <div className="row align-itens">
                <i className="fas fa-book-reader mx-auto text-black mt-2 fa-9x mb-3"></i>
            </div>

            <div className="col-12">
                <h3 className="mx-auto font-weight-bold mt-3 text-center">{match.params.idPost ? 'Atualizar Post' : 'Novo Post'} </h3>
                <form>
                    <div className="form-group">
                        <label>Título:</label>
                        <input onChange={(e) => { setTitulo(e.target.value) }} className="form-control" type="text" value={titulo}></input>
                    </div>

                    <div className='form-group'>
                        <label>Descrição:</label>
                        <textarea onChange={(e) => { setDescricao(e.target.value) }} className='form-control' rows='5' value={descricao}></textarea>
                    </div>

                    <div className="form-group">
                        <label>Selecione a categoria do post:</label>
                        <select onChange={(e) => { setTipo(e.target.value) }} className="form-control" value={tipo}>
                            <option disabled selected value> -- Selecione uma categoria --</option>
                            <option>Pessoal</option>
                            <option>Universidade</option>
                            <option>Trabalho</option>
                            <option>Hobbie</option>
                            <option>Outras</option>
                        </select>
                    </div>
                    <div className="form-group row">
                        <div className="col-6">
                            <label>Data:</label>
                            <input onChange={(e) => { setData(e.target.value) }} className="form-control" type="date" value={data}></input>
                        </div>

                        <div className="col-6">
                            <label>Horário:</label>
                            <input onChange={(e) => { setHorario(e.target.value) }} className="form-control" type="time" value={horario}></input>
                        </div>
                        <div className="col-6">
                            <label className='mt-2'>Upload de imagem:</label>
                            <input onChange={(e) => { setImagemNova(e.target.files[0]) }} type="file" className="form-control"></input>
                        </div>
                    </div>


                    <div className="text-black text-center">
                        {
                            msgType === 'ok' && <span><strong> Deu tudo certo! </strong> Seu post foi salvo com sucesso. &#128571;</span>
                        }

                        {
                            msgType === 'erro' && <span><strong> Deu ruim! </strong> Seu post não foi salvo. &#128575;</span>
                        }
                    </div>

                    <div className='row'>
                        {
                            carregando ? <div class="text-center mx-auto spinner-border text-primary mt-3" role="status"><span class="sr-only">Carregando...</span></div>
                                : <button type='button' onClick={match.params.idPost ? atualizar : cadastrar} className='btn btn-lg btn-block mt-3 mb-5 btn-cadastro' >{match.params.idPost ? 'Atualizar' : 'Cadastrar Post'}</button>

                        }
                    </div>
                </form>


            </div>
        </>
    )


}

export default NewPost;