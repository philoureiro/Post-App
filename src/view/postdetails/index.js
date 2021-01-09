import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import firebase from '../../config/firebase';
import { useSelector } from 'react-redux';
import './postdetails.css';
import Navbar from '../../components/navbar'

function PostDetails({ match }) {
    const [post, setPost] = useState({});
    const [urlImg, setUrlImg] = useState({});
    const usuarioLogado = useSelector(state => state.usuarioEmail);
    const [carregando, setCarregando] = useState(1);
    const [excluido, setExcluido] = useState(false);

    useEffect(() => {
        firebase.firestore().collection('posts').doc(match.params.idPost).get().then(resultado => {
            setPost(resultado.data());
            firebase.firestore().collection('posts').doc(match.params.idPost).update('visualizacoes', resultado.data().visualizacoes + 1);
            firebase.storage().ref(`imagens/${resultado.data().imagem}`).getDownloadURL().then(url => {
                setUrlImg(url)
                setCarregando(0);
            });
        })
    }, []);

    function remove() {
        firebase.firestore().collection('posts').doc(match.params.idPost).delete().then(() => {
            setExcluido(true);
        })
    }

    return (
        <>
            <Navbar></Navbar>
            {
                excluido ? <Redirect to='/'></Redirect>
                    : null
            }

            <div className='container-fluid'>
                {
                    carregando ? <div className='row'><div class="spinner-border text-primary mt-2 mx-auto fa-12x" role="status"><span class="sr-only text-black">Carregando...</span></div></div>
                        :
                        <div>
                            <div className='row'>
                                <img src={urlImg} className='img-banner' alt='Banner'></img>

                                <div className='col-12 text-right mt-2 views'>
                                    <i className='far fa-eye'><span>{post.visualizacoes + 1}</span></i>
                                </div>
                                <h3 className='mx-auto mt-5 titulo'>{post.titulo}</h3>
                            </div>

                            <div className='row mt-5 d-flex justify-content-around'>
                                <div className='col-md-3 col-sm-12 p-3 box-info my-2'>
                                    <i className='fas fa-ticket-alt fa-2x mb-2'></i>
                                    <h5><strong>Categoria</strong></h5>
                                    <span className='mt-3'>{post.tipo}</span>
                                </div>

                                <div className='col-md-3 col-sm-12 p-3 box-info my-2'>
                                    <i className='fas fa-calendar-alt fa-2x mb-2'></i>
                                    <h5><strong>Data</strong></h5>
                                    <span className='mt-3'>{post.data}</span>
                                </div>
                                <div className='col-md-3 col-sm-12 p-3 box-info my-2'>
                                    <i className='fas fa-clock fa-2x mb-2'></i>
                                    <h5><strong>Hora</strong></h5>
                                    <span className='mt-3'>{post.horario}</span>
                                </div>
                            </div>


                            <div className='row box-detais'>
                                <div className='col-12 text-center'>
                                    <h5><strong>Descrição</strong></h5>
                                </div>
                                <div className='col-12 text-center'>
                                    <p>{post.descricao}</p>
                                </div>
                            </div>

                            {
                               usuarioLogado === post.usuario ?
                                    <Link to={`/postedit/${match.params.idPost}`} className='btn-edit'> <i className='fas fa-pen-square fa-3x'></i></Link>
                                    : null
                            }

                            {
                               usuarioLogado == post.usuario ?
                                   <button type='button' onClick={remove} className='btn btn-lg btn-block mt-3 mb-5 btn-cadastro p-10'>Excluir</button>
                                    : null
                            }
                            

                        </div>

                }

            </div>
            </>
    )
};

export default PostDetails;