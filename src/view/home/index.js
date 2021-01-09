import React, { useEffect, useImperativeHandle, useState } from 'react';
import './home.css';
import { Link } from 'react-router-dom';
import Navbar from '../../components/navbar';
import { useSelector } from 'react-redux';
import PostCard from '../../components/postcard';
import firebase from '../../config/firebase'


function Home({ match }) {

    const [post, setPost] = useState([]);
    let listaPosts = [];
    const [pesquisa, setPesquisa] = useState('');
    const usuarioEmail = useSelector(state => state.usuarioEmail);
    const [labelPosts, setLabelPosts] = useState(1);


    useEffect(() => {
        if (match.params.paramentos) {
            firebase.firestore().collection('posts').where('usuario', '==', usuarioEmail).get().then(async (resultado) => {
                await resultado.docs.forEach(doc => {
                    if (doc.data().titulo.indexOf(pesquisa) >= 0) {
                        listaPosts.push({
                            id: doc.id,
                            ...doc.data()
                        })
                    }
                })
                setPost(listaPosts);
                setLabelPosts(0);
            })

        } else {
            firebase.firestore().collection('posts').get().then(async (resultado) => {
                await resultado.docs.forEach(doc => {
                    if (doc.data().titulo.indexOf(pesquisa) >= 0) {
                        listaPosts.push({
                            id: doc.id,
                            ...doc.data()
                        })
                    }
                })
                setPost(listaPosts);
                setLabelPosts(1);
            })
        }
    });

    return (
        <>
            <Navbar></Navbar>

            <div className="row align-itens">
                <i className="fas fa-book-reader mx-auto text-black mt-2 fa-5x"></i>
            </div>

            

            {
                labelPosts ? <h2 className='mx-auto text-center'>Lista de todos os posts publicados</h2>
                    : <h2 className='mx-auto text-center'>Seus posts publicados</h2>
            }

            <div className='row p-5'>
                <input onChange={(e) => setPesquisa(e.target.value)} type='text' className='form-control text-center' placeholder='Pesquisar post pelo título...'></input>
            </div>

            <div className='row p-3'>
                {
                    post.map(item => <PostCard key={item.id} id={item.id} descricao={item.descricao}
                        titulo={item.titulo} views={item.visualizacoes} imagem={item.imagem}></PostCard>)

                }
            </div>
        </>
    )
}
export default Home;