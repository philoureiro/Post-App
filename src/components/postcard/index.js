import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './postcard.css';
import firebase from '../../config/firebase'

function PostCard({ id, key, titulo, descricao, views, imagem }) {

    const [urlImagem, setUrlImagem] = useState();

    useEffect(() => {
        firebase.storage().ref(`imagens/${imagem}`).getDownloadURL().then(url => {
            setUrlImagem(url);
        }).catch(erro => {
            alert('deu ruim aqui' + erro);
        })
    }, [urlImagem]);



    return (
        <div className='col-md-3 col-sm-12'>
            <div className='card-body text-justify'>
                <img id='imgCard' src={urlImagem} className='card-md-top img-cartao'></img>
                <h5 className='text-center'>{titulo}</h5>
                <p className='card-text'>{descricao}</p>

                <div className='row rodape-card d-flex align-items-center text-justify'>
                    <div className='col-6'>
                        <Link to={`/postdetails/${id}`} className='btn btn-sm btn-detalhes'>+ detalhes</Link>
                    </div>
                    <div className='col-6'>
                        <i className='far fa-eye'></i>
                        <span>{views}</span>
                      

                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostCard;